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
      for (let i = 5; i < songs.length; i++) {
        let song = songs[i];

        if (typeof (song) !== "undefined") {
          result.push(
            <div key={song.id} className="song" onClick={() => handleClick(song)}>
              <img src={song.album.images[2].url} alt={song.album.images[2].url} />
              <div className="song-info">
                <h1>{cropParagraph(song.name, 30)}</h1>
                <p>{cropParagraph(song.artists[0].name, 30)}</p>
              </div>
              <div className="song-control">
                <p>{convertToMin(song.duration_ms)}</p>
                <BsPlus className="song-control-plus" onClick={(event) => handleAdd(event, song)} />
              </div>
            </div >
          )
        }
      }
    }
    return result;
  }


  return (
    <div>
      <div className="songs">
        {displaySong(songs)}
      </div>
    </div>
  )
}