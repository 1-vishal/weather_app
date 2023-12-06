import { useState } from 'react';
import React from 'react'
import Icon from '../assets/images/search.png'

function Search(props) {
  let api_key = "9c67f7e930691492acc3e82b29d1c58d";

  const [cityName, setCityName] = useState("");

  const handleSearch = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;
    await fetch(url).then((res) => {
      return res.json()
    }).then((data) => {
      if(data.cod !== 200){
        return alert(data.message)
      }
      props.searchData(data);
    }).catch((error)=>{
      console.log(error);
    })
    

  }

  return (
    <div className='search-bar'>
      <input type="text" name="search-city" id="search-city" onChange={(event) => setCityName(event.target.value)} placeholder='Enter the City...' />
      <div className="search-icon" onClick={handleSearch}>
        <img src={Icon} alt="" />
      </div>
    </div>
  )
}

export default Search