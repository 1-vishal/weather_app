import { useState, useEffect } from 'react'
import axios from 'axios'
// import Search from './Search';

import WeatherDrizzleIcon from '../assets/images/drizzle.png';
import WeatherHumidityIcon from '../assets/images/humidity.png';
import WeatherWindIcon from '../assets/images/wind.png';


export default function WeatherDetails(props) {

  const [temp, setTemp] = useState("24")
  const [humidity, setHumidity] = useState("64")
  const [windSpeed, setWindSpeed] = useState("3")
  const [cityName, setCityName] = useState("Delhi")
  const [iconId, setIconId] = useState("04d");
  const [description, setDescription] = useState("Cloudy");

  useEffect(() => {
    if (props.updateCityWeatherData !== null) {
      setTemp(props.updateCityWeatherData.main.temp);
      setHumidity(props.updateCityWeatherData.main.humidity);
      setWindSpeed(props.updateCityWeatherData.wind.speed);
      setCityName(props.updateCityWeatherData.name);
      setIconId(props.updateCityWeatherData.weather[0].icon);
      setDescription(props.updateCityWeatherData.weather[0].description);
    }
  }, [props.updateCityWeatherData]);

  return (
    <div className='bg-gradient-to-tr from-blue-100 to-yellow-300 p-4 w-96 rounded-3xl text-blue-400 mr-16 ml-16 mt-12 shadow-2xl'>
      <div className="flex justify-center">
        <img src={`http://openweathermap.org/img/wn/${iconId}@4x.png`} alt="" />
      </div>
      <div className="text-4xl text-center">{temp}°c</div>
      <div className="text-6xl text-center">{cityName.toUpperCase()}</div>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div className="mt-5">
            <div className="text-4xl">{humidity}%</div>
            <div className="text-2xl"><u>Humidity</u></div>
          </div>
          <img src={WeatherHumidityIcon} alt="" />
        </div>
        <div className="flex justify-between items-center">
          <div className="mt-5">
            <div className="text-4xl">{windSpeed} Km/h</div>
            <div className="text-2xl"><u>Wind Speed</u></div>
          </div>
          <img src={WeatherWindIcon} alt="" />
        </div>
      </div>
      <div className="text-5xl capitalize text-center">{description}
      </div>
    </div>
  )
}
