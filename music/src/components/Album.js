import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';

export default function Album({ albums, cropParagraph, handleClick }) {

  // display albums
  function displayAlbum(albums) {
    let result = [];
    if (albums.length === 0) {
      return (
        <div className="album">
          <p>no result</p>
        </div>
      )
    } else {
      let names = [];
      for (let i = 0; i < albums.length; i++) {
        let album = albums[i];
        if (names.includes(album.collectionCensoredName)) {
          continue;
        } else {
          names.push(album.collectionCensoredName);
          result.push(
            <div key={album.collectionId} className="album" >
              <div className="album-thumbnail">
                <img src={album.artworkUrl100} alt={album.artworkUrl100} />
                <div className="album-layer">
                  <FaPlayCircle
                    className="album-play-button"
                    onClick={() => handleClick(album)}
                  />
                </div>
              </div>
              <div className="album-info">
                <h1>{cropParagraph(album.collectionCensoredName, 15)}</h1>
                <p>{cropParagraph(album.artistName, 20)}</p>
              </div>
            </div >
          )
        }
        if (result.length === 6) return result;
      }
    }
    return result;
  }

  return (
    <div>
      <h2>Albums</h2>
      <div className="album-list">
        {/* {displayAlbum(albums)} */}
      </div>
    </div>
  )
}