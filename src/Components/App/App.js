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
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    // console.log('addTrack running');
    if (this.state.playlistTracks.find(addedTrack => addedTrack.id === track.id)) {
      // console.log('addTrack found a match');
      return;
    } else {
      // console.log('addTrack did NOT find a match');
      this.state.playlistTracks.push(track);
      this.setState({ playlistTracks: this.state.playlistTracks})
      // console.log('playlistTracks: ');
      // console.log(this.state.playlistTracks);
    }
  }
  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter(removedTrack => removedTrack.id !== track.id);
    this.setState({playlistTracks: newPlaylistTracks});
    if (this.state.searchResults.find(removedTrack => removedTrack.id === track.id)) {
      console.log('removeTrack found a match');
      // need to do something with setState here to unhide
      console.log(this.state.searchResults);

      return;
    }
    // console.log('newPlaylistTracks: ');
    // console.log(newPlaylistTracks);
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  savePlaylist(){
    const uriList = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, uriList)
      .then(() => this.setState({
        playlistTracks: [],
        playlistName: 'New Playlist'
      }));
    // console.log("Spotify.savePlaylist has run");
    // console.log("playlistName and playlistTracks reset");
    // console.log(this.state.playlistName);
    // console.log(this.state.playlistTracks);
  }
  search(term){
    // console.log('term: ' + term);
    Spotify.search(term).then(items => this.setState({
      searchResults: items
    }));
  }
  componentDidMount() {
    Spotify.getAccessToken();
  }

  render() {
    // console.log('App this.state:', this.state);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
