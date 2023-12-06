import React, { useState } from 'react';
import Search from './Search';

import WeatherDrizzleIcon from '../assets/images/drizzle.png';
import WeatherHumidityIcon from '../assets/images/humidity.png';
import WeatherWindIcon from '../assets/images/wind.png';


export default function WeatherDetails() {

  const [temp, setTemp] = useState("24")
  const [humidity, setHumidity] = useState("64")
  const [windSpeed, setWindSpeed] = useState("3")
  const [cityName, setCityName] = useState("London")
  const [iconId, setIconId] = useState("04d");
  const [description, setDescription] = useState("Cloudy");


  const handleSearchData = (data) => {
    setTemp(data.main.temp);
    setHumidity(data.main.humidity);
    setWindSpeed(data.wind.speed);
    setCityName(data.name);
    setIconId(data.weather[0].icon);
    setDescription(data.weather[0].description);
  };

  return (
    <div className='weather-container'>
      <Search searchData={handleSearchData} />
      <div className="weather-icon">
        <img src={`http://openweathermap.org/img/wn/${iconId}@4x.png`} alt="" />
      </div>
      <div className="temp">{temp}°c</div>
      <div className="city-name">{cityName}</div>
      <div className="content">
        <div className="element">
          <img src={WeatherHumidityIcon} alt="" />
          <div className="data">
            <div className="percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={WeatherWindIcon} alt="" />
          <div className="data">
            <div className="percent">{windSpeed} Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      <div className="description">{description}
        </div>
    </div>
  )
}
