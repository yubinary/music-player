import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { BsPlus } from 'react-icons/bs';

export default function Album({ albums, cropParagraph, handleClick, handleAdd, joinArray }) {

  // display albums
  function displayAlbum(albums) {
    console.log(albums)
    let result = [];
    let end = 0;
    if (typeof (albums) === "undefined" || albums.length === 0) {
      return (
        <div className="album">
          <p>no result</p>
        </div>
      )
    } else {
      end = albums.length > 5 ? 5 : albums.length;
      for (let i = 0; i < end; i++) {
        let album = albums[i];
        result.push(
          <div key={album.id} className="album" >
            <div className="album-thumbnail">
              <img src={album.album.images[1].url} alt={album.album.images[1].url} />
              <div className="album-layer">
                <FaPlayCircle
                  className="album-play-button"
                  onClick={() => handleClick(album)}
                />
                <BsPlus
                  className="album-add-button"
                  onClick={(event) => handleAdd(event, album)}
                />
              </div>
            </div>
            <div className="album-info">
              <h1>{cropParagraph(album.name, 23)}</h1>
              <p>{cropParagraph(joinArray(album.artists), 20)}</p>
            </div>
          </div >
        )
      }
    }
    return result;
  }

  return (
    <div>
      <h2>Top Tracks</h2>
      <div className="album-list">
        {displayAlbum(albums)}
      </div>
    </div>
  )
}