import React from 'react';
import { BsPlus } from 'react-icons/bs';

export default function Song({ songs, cropParagraph, handleClick, playlist, setPlaylist }) {

  // helper function that converts milliseconds to minutes
  function convertToMin(ms) {
    let min = Math.floor(ms / 60000) + "";
    if (min.length > 1) {
      return min + "";
    }
    else {
      let sec = (ms % 60000) + "";
      return min + ":" + sec.substring(0, 2);
    }
  }

  // add clicked song to the playlist
  function handleAdd(event, song) {
    event.stopPropagation();
    setPlaylist([...playlist, song]);
  }

  // display songs
  function displaySong(songs) {
    let result = [];
    if (songs.length === 0) {
      return (
        <div className="song">
          <p>no result</p>
        </div>
      )
    } else {
      for (let i = 0; i < songs.length; i += 2) {
        let songl = songs[i];
        let songr = songs[i + 1];

        if (typeof (songl) !== "undefined" && typeof (songr) !== "undefined") {
          result.push(
            <div key={songl.id} className="row">
              <div className="song" onClick={() => handleClick(songl)}>
                <img src={songl.album.images[2].url} alt={songl.album.images[0].url} />
                <div className="song-info">
                  <h1>{cropParagraph(songl.name, 30)}</h1>
                  <p>{cropParagraph(songl.artists[0].name, 30)}</p>
                </div>
                <div className="song-control">
                  <p>{convertToMin(songl.duration_ms)}</p>
                  <BsPlus className="plus" onClick={(event) => handleAdd(event, songl)} />
                </div>
              </div >
              <div className="song" onClick={() => handleClick(songr)}>
                <img src={songr.album.images[2].url} alt={songr.album.images[0].url} />
                <div className="song-info">
                  <h1>{cropParagraph(songr.name, 30)}</h1>
                  <p>{cropParagraph(songr.artists[0].name, 30)}</p>
                </div>
                <div className="song-control">
                  <p>{convertToMin(songr.duration_ms)}</p>
                  <BsPlus className="plus" onClick={(event) => handleAdd(event, songr)} />
                </div>
              </div >
            </div>
          )
        }
      }
    }
    return result;
  }


  return (
    <div>
      <h2>Top Tracks</h2>
      <div className="song-list">
        {displaySong(songs)}
      </div>
    </div>
  )
}