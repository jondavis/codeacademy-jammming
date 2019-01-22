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
		let arg1 = `https://api.spotify.com/v1/search?type=track&q=${term}`;
		let arg2 = {
			headers: { Authorization: `Bearer ${this.getAccessToken()}` } 
		};
		return fetch(arg1, arg2)
			.then(response => {
				if (response.ok) {
					//console.log(response.json());
					return response.json();
				}
				throw new Error('Request failed!');
			}, networkError => {
					console.log('networkError.message: ' + networkError.message);
			})
			.then(jsonResponse => {
				//console.log('jsonResponse.tracks.items: ');
				//console.log(jsonResponse.tracks.items);
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
					// console.log('trackData: ');
					// console.log(trackData);
					return trackData;
				}
			});
	},
	savePlaylist(playlistName, trackUris) {
		if (!playlistName || !trackUris) {
			return;
		}
		//let accessToken = this.getAccessToken();
		let headersVar = {
			headers: { 
				Authorization: `Bearer ${this.getAccessToken()}` 
			}
		};
		let userId;
		let userIdEndpoint = 'https://api.spotify.com/v1/me';
		let playlistID;
		//let playlistPostEndpoint = `/v1/users/${userId}/playlists`

		fetch(userIdEndpoint, { headers: headersVar })
			.then(response => {
				if (response.ok) {
					//renderJsonResponse(response)
					return response.json()
				}
				throw new Error('Request failed!');
			}, networkError => {
				console.log(networkError.message)
			})
			.then(jsonResponse => {
				console.log('jsonResponse: ');
				console.log(jsonResponse);
				userId = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					method: 'POST',
					headers: headersVar,
					body: JSON.stringify({
						name: playlistName
					})
						.then(response => {
							if (response.ok) {
								return response.json()
							}
							throw new Error('Request failed!');
						}, networkError => {
							console.log(networkError.message);
						}).then(jsonResponse => {
							console.log(jsonResponse);
							playlistID = jsonResponse.id;
						}).then(() => {
							fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
								method: 'POST',
								headers: headersVar,
								body: JSON.stringify({
									uris: trackUris
								})
							})
						})
						

				})
			})
			
	}
};

export default Spotify;