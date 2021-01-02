import React, { useState } from 'react';
import axios from 'axios';
import Player from "../components/Player.js";
import Album from "../components/Album.js";
import Song from "../components/Song.js";

import { BiSearch } from 'react-icons/bi';
import { FiGithub } from 'react-icons/fi';
import "../styles/Home.css";

export default function MainContent() {
  const [artistId, setArtistId] = useState("");
  const [songs, setSongs] = useState([]);
  const [songToPlay, setSongToPlay] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  // first object is the song playing
  const [playlist, setPlaylist] = useState([{}]);

  // make get song request to Spotify API
  function fetchSong(setFunction, artistId) {
    let idParam = encodeURIComponent(artistId);
    let url = "https://spotify-api-wrapper.appspot.com/artist/" + idParam + "/top-tracks";

    axios.get(url)
      .then(result => {
        console.log(url);
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
        setArtistId(id);
        fetchSong(setSongs, id);
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


    // fetchSong(setSongs);
    // fetchSong(setAlbums);
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

  return (
    <div className="body">
      <div className="home">
        <div className="header">
          <FiGithub className="github" />
          <form className="input"
            onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="find" type="submit">
              <BiSearch className="search-icon" />
            </button>
          </form>
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
    </div>
  )
} 