import React from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';
import Spotify from './util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : [],
      playlistName: 'My playlist',
      playlistTracks: []
    }

    // Binds //

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Add a new track //

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  // Remove a track //

  removeTrack(track) {
    let array = this.state.playlistTracks.slice();
    let index = array.indexOf(track);
    array.splice(index, 1);
    this.setState({ playlistTracks: array });
}

  // Update the playlist name //

  updatePlaylistName(name) {
    this.setState(
      {playlistName: name}
    )
  }

  // Save the playlist //

   savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>{
      this.setState(
        {
          playlistName: 'New Playlist',
          playlistTracks: []
        }
      )
    });
  }

search(searchTerm) {
  Spotify.search(searchTerm).then(tracks => this.setState({searchResults: tracks}))
}

  render() {
    return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch = {this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} 
                     onAdd={this.addTrack}/>
      <Playlist playlistName = {this.state.playlistName} 
                playlistTracks = {this.state.playlistTracks}
                onRemove ={this.removeTrack}
                onNameChange = {this.updatePlaylistName}
                onSave = {this.savePlaylist} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
