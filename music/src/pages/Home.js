import React, { useState } from 'react';
import axios from 'axios';
import Player from "../components/Player.js";
import Album from "../components/Album.js";
import Song from "../components/Song.js";

import { BiSearch } from 'react-icons/bi';
import "../styles/Home.css";
import "../styles/Header.css";
import "../styles/AlbumSong.css";
import "../styles/Player.css";

export default function MainContent() {
  const [artistId, setArtistId] = useState("");
  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState([]);
  const [songToPlay, setSongToPlay] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  // first object is the song playing
  const [playlist, setPlaylist] = useState([{}]);

  // make get song request to Spotify API, used callback
  function fetchSong(setFunction, artistId) {
    let idParam = encodeURIComponent(artistId);
    let url = "https://spotify-api-wrapper.appspot.com/artist/" + idParam + "/top-tracks";

    axios.get(url)
      .then(result => {
        setFunction(result.data.tracks);
      })
      .catch(error => {
        console.error(error);
      })
  }

  function fetchArtist() {
    let searchParam = encodeURIComponent(searchTerm);
    let url = "https://spotify-api-wrapper.appspot.com/artist/" + searchParam;

    axios.get(url)
      .then(result => {
        let id = result.data.artists.items[0].id;
        let artist = result.data.artists.items[0];
        setArtistId(id);
        fetchSong(setSongs, id);
        setArtist(artist)
      })
      .catch(error => {
        console.error(error);
      })
  }

  // pass song prop when song clicked
  function handleClick(song) {
    setSongToPlay(song);
  }

  // fetch search term to when button clicked
  function handleSubmit(event) {
    // prevent default action of form (ex. refresh the page)
    event.preventDefault();
    fetchArtist();
  }

  // helper function that crops paragraph by given length
  function cropParagraph(p, len) {
    let crop = "";
    if (p && p.length > len) {
      crop = p.substring(0, len - 2) + "..."
    } else {
      crop = p;
    } return crop;
  }

  var headerStyle = {
    backgroundImage: "url(" + artist.images[0].url + ")",
  };
  console.log(artist)
  return (
    <div className="body">
      <div className="home">
        <div className="header" style={headerStyle}>
          <div className="navigation">
            <h1>Music</h1>
            <form className="search-bar"
              onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button className="search-bar-button" type="submit">
                <BiSearch className="search-bar-icon" />
              </button>
            </form>
          </div>
          <div className="artist">
            <img className="artist-img" src={artist.images[1].url} alt={artist.images[1].url} />
            <div className="artist-info">
              <h2>{artist.name}</h2>
              <div className="artist-detail">
                <p>{artist.followers.total}</p>
                <p>{artist.genres}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="results">
          <Album
            albums={songs}
            cropParagraph={cropParagraph}
            handleClick={handleClick}
          />
          <Song
            songs={songs}
            cropParagraph={cropParagraph}
            handleClick={handleClick}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
        </div>
      </div>
      <Player
        song={songToPlay}
        playlist={playlist}
        setPlaylist={setPlaylist}
        cropParagraph={cropParagraph}
      />
    </div >
  )
} 