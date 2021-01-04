import React, { useState } from 'react';
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

export default function Search() {
  let history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  function fetchArtist() {
    let searchParam = encodeURIComponent(searchTerm);
    let url = "https://spotify-api-wrapper.appspot.com/artist/" + searchParam;

    axios.get(url)
      .then(result => {
        let id = result.data.artists.items[0].id;
        let artist = result.data.artists.items[0];
        history.push({
          pathname: "/artist",
          searchArtistId: id,
          searchArtist: artist
        });
      })
      .catch(error => {
        console.error(error);
      })
  }

  function handleSubmit(event) {
    // prevent default action of form (ex. refresh the page)
    event.preventDefault();
    fetchArtist();
  }

  return (
    <div className="search">
      <form className="search-bar"
        onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for an artist"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button className="search-bar-button" type="submit">
          <BiSearch className="search-bar-icon" />
        </button>
      </form>
    </div>
  )
}