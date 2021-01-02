import React, { useState } from 'react';
import axios from 'axios';
import Player from "../components/Player.js";
import Album from "../components/Album.js";
import Song from "../components/Song.js";

import { BiSearch } from 'react-icons/bi';
import { FiGithub } from 'react-icons/fi';
import "../styles/Home.css";

export default function MainContent() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songToPlay, setSongToPlay] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  // first object is the song playing
  const [playlist, setPlaylist] = useState([{}]);

  // make get song request to Apple Music API
  function fetchEntity(entity, limit, setFunction) {
    // entity list: musicArtist, album, song
    let searchParam = "search?term=" + encodeURIComponent(searchTerm);
    let limitParam = "&limit=" + limit;
    let entityParam = "&entity=" + entity;
    let url = "https://itunes.apple.com/" + searchParam + limitParam + entityParam;

    axios.get("https://spotify-api-wrapper.appspot.com/artist/3HqSLMAZ3g3d5poNaI7GOU/top-tracks")
      .then(result => {
        setFunction(result.data.tracks);
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
    fetchEntity("song", 10, setSongs);
    fetchEntity("album", 6, setAlbums);
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
      <div className="main-content">
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
            albums={albums}
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