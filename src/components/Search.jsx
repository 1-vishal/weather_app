import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Icon from '../assets/images/searchlogo.svg'

function Search(props) {
  const [cityName, setCityName] = useState("");
  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = () => {
    props.handleSearch(cityName);
  }

  return (
    <div className='flex items-center justify-center pt-16'>
      <div className="flex items-center max-w-md mx-auto bg-blue-200 rounded-lg w-1/2 h-16">
        <div className="w-full">
          <input type="search" className="w-full px-4 py-1 text-xl text-blue-500 bg-transparent rounded-full focus:outline-none"
            placeholder="Enter the City Name" onChange={(event) => setCityName(event.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter")
                handleSearch();
            }} />
        </div>
        <div>
          <button type="submit" className={(cityName.length > 0) ? 'flex items-center bg-blue-400 justify-center w-16 h-16 text-white rounded-r-lg bg-blue-400' : 'flex items-center bg-yellow-200 justify-center w-16 h-16 text-white rounded-r-lg bg-blue-200 cursor-not-allowed'}
            disabled={cityName.length == 0} onClick={handleSearch} onKeyDown={handleSearch}>
            <img src={Icon} className="w-5 h-5" alt="search" />
          </button>
        </div>
      </div>
    </div >
  )
}

export default Search