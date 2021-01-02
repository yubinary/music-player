import React, { useState, useEffect } from 'react';
import Playlist from "./Playlist.js";

import { BsFillPauseFill, BsFillPlayFill, BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs';

export default function Player({ song, playlist, setPlaylist, cropParagraph }) {
  const [isPlay, setIsPlay] = useState(false);
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    audio.src = song.preview_url;
    setAudio(audio);
    setIsPlay(true);
    audio.play();
  }, [song, audio])

  // change state: pause music when playing, play music when paused
  function handleClick() {
    if (!isPlay) {
      audio.play();
      setIsPlay(true);
    } else {
      audio.pause();
      setIsPlay(false);
    }
  }

  // show pause button when playing, play button when paused
  function displayButton() {
    if (isPlay) {
      return (
        <button className="play" onClick={handleClick}><BsFillPauseFill /></button>
      )
    } else {
      return (
        <button className="play" onClick={handleClick}><BsFillPlayFill /></button>
      )
    }
  }

  // handle case when song is an empty object
  if (Object.keys(song).length === 0) {
    return (
      <div className="side-bar">
      </div>
    )
  } else {
    return (
      <div className="side-bar">
        <div className="player">
          <img src={song.album.images[1].url} alt={song.album.images[1].url} />
          <div className="player-info">
            <h1>{song.name}</h1>
            <p>{song.artists[0].name}</p>
          </div>
          <div>
            <button className="skip">
              <BsFillSkipStartFill />
            </button>
            {displayButton()}
            <button className="skip">
              <BsFillSkipEndFill />
            </button>
          </div>
        </div>
        <Playlist
          playlist={playlist}
          setPlaylist={setPlaylist}
          cropParagraph={cropParagraph}
        />
      </div>
    )
  }
}