import React from 'react';
import { BiMinus } from 'react-icons/bi';

export default function Playlist({ playlist, setPlaylist, cropParagraph }) {

  // remove the song when clicked
  function handleRemove(i) {
    let before = playlist.slice(0, i);
    let after = playlist.slice(i + 1);
    setPlaylist([...before, ...after])
  }

  // display playlist
  function displayPlaylist(playlists) {
    let result = [];
    // first element is the song playing
    for (let i = 0; i < playlists.length; i++) {
      let playlist = playlists[i];
      result.push(
        <div key={i + 1} className="playlist-song">
          <p>{i + 1}</p>
          <div className="playlist-song-info">
            <h1>{cropParagraph(playlist.name, 20)}</h1>
            <p>{cropParagraph(playlist.artists[0].name, 40)}</p>
          </div>
          <BiMinus className="playlist-song-minus" onClick={() => handleRemove(i)} />
        </div>
      )
    } return result;
  }

  return (
    <div>
      <h4>Up Next</h4>
      {displayPlaylist(playlist)}
    </div>
  )
}