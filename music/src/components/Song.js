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

  // helper function that always makes number to two digits
  function twoDigits(rank) {
    if (rank.length === 1) {
      return "0" + rank;
    } else return rank;
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
            <tr key={song.id} className="song" onClick={() => handleClick(song)}>
              <td className="song-rank">{twoDigits(i + 1 + "")}</td>
              <td>
                <img src={song.album.images[2].url} alt={song.album.images[2].url} />
              </td>
              <td className="song-info">
                <h1>{cropParagraph(song.name, 40)}</h1>
                <p>{cropParagraph(song.artists[0].name, 30)}</p>
              </td>
              <td className="song-album">{cropParagraph(song.album.name, 35)}</td>
              <td className="song-time">{convertToMin(song.duration_ms)}</td>
              <td>
                <BsPlus className="song-control-plus" onClick={(event) => handleAdd(event, song)} />
              </td>
            </tr >
          )
        }
      }
    }
    return result;
  }


  return (
    <div>
      <div className="songs">
        <table className="songs-table">
          <tr>
            <th>#</th>
            <th></th>
            <th>Track / Artist</th>
            <th>Album</th>
            <th>Time</th>
            <th>Add</th>
          </tr>
          {displaySong(songs)}
        </table>
      </div>
    </div>
  )
}