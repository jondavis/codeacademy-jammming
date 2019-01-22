import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Bigmouth Strikes Again',
          artist: 'The Smiths',
          album: 'The Queen Is Dead',
          id: '99998'
        },
        {
          name: 'Summer Babe',
          artist: 'Pavement',
          album: 'Slanted + Enchanted',
          id: '99999'
        },
        {
          name: 'Cannonball',
          artist: 'The Breeders',
          album: 'Last Splash',
          id: '99995'
        },
        {
          name: 'Dangerous Type',
          artist: 'The Cars',
          album: 'Candy-O',
          id: '99996'
        },
      ],
      playlistName: "Bertie's Little Playlist",
      playlistTracks: [
        {
          name: 'Thousands Are Sailing',
          artist: 'The Pogues',
          album: 'If I Should Fall From Grace With God',
          id: '99997'
        },
        {
          name: 'Dangerous Type',
          artist: 'The Cars',
          album: 'Candy-O',
          id: '99996'
        },
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    console.log('addTrack running');
    if (this.state.playlistTracks.find(addedTrack => addedTrack.id === track.id)) {
      console.log('addTrack found a match');
      return;
    } else {
      console.log('addTrack did NOT find a match');
      this.state.playlistTracks.push(track);
      this.setState({ playlistTracks: this.state.playlistTracks})
      console.log('playlistTracks: ');
      console.log(this.state.playlistTracks);
    }
  }
  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter(removedTrack => removedTrack.id !== track.id);
    this.setState({playlistTracks: newPlaylistTracks})
    console.log('newPlaylistTracks: ');
    console.log(newPlaylistTracks);
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  savePlaylist(){
    const uriList = this.state.playlistTracks.map(track => track.uri);
    console.log('uriList: ');
    console.log(uriList);
  }
  search(term){
    console.log('term: ' + term);
    Spotify.search(term);
  }

  render() {
    console.log('App this.state:', this.state);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
