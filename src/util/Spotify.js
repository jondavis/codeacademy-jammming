let accessToken;
let expiresIn;
const clientID = '4a0dfddd24344aad887c6a28d8d7ff3a';
const redirectURI = 'http://localhost:3000/';


const Spotify = {
	getAccessToken() {
		if (accessToken)
			return accessToken;
		else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
			accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
			expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');

			return accessToken;
		}
		else {
			let url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
			window.location = url;
		}
	},

	search(term) {
		let accessToken = this.getAccessToken();
		// console.log('Spotify.js search() accessToken: ' + accessToken);
		let arg1 = `https://api.spotify.com/v1/search?type=track&q=${term}`;
		return fetch(arg1, {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.tracks.items) {
					const trackData = jsonResponse.tracks.items.map(track => {
						return {
							id: track.id,
							name: track.name,
							artist: track.artists[0].name,
							album: track.album.name,
							uri: track.uri
						}
					})
					return trackData;
				}
			});
	},
	
	savePlaylist(playlistName, trackUris) {
		if (!playlistName || !trackUris) {
			return;
		}
		let accessToken = this.getAccessToken();
		// console.log('Spotify.js savePlaylist accessToken: ' + accessToken);

		let userId;
		let playlistID;
		const userIdEndpoint = 'https://api.spotify.com/v1/me';
		
		return fetch(userIdEndpoint, {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
			.then(response => response.json())
			.then(jsonResponse => userId = jsonResponse.id)
			.then(() => {
				// console.log('userId: ' + userId); 
				const userPlaylistsEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
				fetch(userPlaylistsEndpoint, {
					method: 'POST',
					headers: { Authorization: `Bearer ${accessToken}` },
					body: JSON.stringify({
						name: playlistName
					})
				})
					.then(response => response.json())
					.then(jsonResponse => {
						// console.log('jsonResponse 2: ');
						// console.log(jsonResponse);
						playlistID = jsonResponse.id;
						// console.log('playlistID: ' + playlistID);
					})
					.then(() => {
						fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
							method: 'POST',
							headers: { Authorization: `Bearer ${accessToken}` },
							body: JSON.stringify({
								uris: trackUris
							})
						});
					})
			})	
	}
	
};

export default Spotify;