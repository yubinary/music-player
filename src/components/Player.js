import React, { useState, useEffect } from 'react';
import Playlist from "./Playlist.js";
import disk from "./disk.png";

import { BsFillPauseFill, BsFillPlayFill, BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs';

export default function Player({ song, setSongToPlay, playlist, setPlaylist, cropParagraph, joinArray }) {
  const [isPlay, setIsPlay] = useState(false);
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    audio.src = song.preview_url;
    setAudio(audio);
    setIsPlay(true);
    audio.play();
  }, [song, audio])

  useEffect(() => {
    audio.onended = function () {
      if (playlist[0] === song) {
        audio.play();
        setPlaylist(playlist.slice(1));
      }
      if (playlist.length !== 0) {
        setSongToPlay(playlist[0]);
        setPlaylist(playlist.slice(1));
      }
    }
  }, [playlist])

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

  // handle when skip start button clicked
  function handleSkipStart() {
    audio.currentTime = 0;
  }

  // handle when skip end button clicked
  function handleSkipEnd() {
    if (playlist[0] === song) {
      audio.currentTime = 0;
      setPlaylist(playlist.slice(1));
    }
    if (playlist.length !== 0) {
      setSongToPlay(playlist[0]);
      setPlaylist(playlist.slice(1));
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

  // handle case when preview url is not provided
  function hasPreview() {
    if (song.preview_url === null) {
      return (
        <div>
          <p className="error">preview not provided</p>
        </div>
      )
    } else {
      return (
        <div>
          <button className="skip">
            <BsFillSkipStartFill onClick={handleSkipStart} />
          </button>
          {displayButton()}
          <button className="skip">
            <BsFillSkipEndFill onClick={handleSkipEnd} />
          </button>
        </div>
      )
    }
  }

  // helper function for conditional animation
  function isAnimation(title) {
    if (title.length > 17) {
      return (
        <h1 className="animate-h1">{song.name}</h1>
      )
    } else {
      return (
        <h1 className="noanimate-h1">{song.name}</h1>
      )
    }
  }

  // handle case when song is an empty object
  if (Object.keys(song).length === 0) {
    return (
      <div className="player">
      </div>
    )
  } else {
    return (
      <div className="player">
        <div className="player-song">
          <div className="player-img">
            <img className="player-album" src={song.album.images[1].url} alt={song.album.images[1].url} />
            <img className="player-disk" src={disk} alt="disk" />
          </div>
          <div className="player-song-info">
            {isAnimation(song.name)}
            <p>{cropParagraph(joinArray(song.artists), 27)}</p>
          </div>
          {hasPreview()}
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