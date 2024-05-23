import { useState, useEffect } from 'react'
import ReactLoading from 'react-loading';
import Search from './components/Search';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

import WeatherDetails from './components/WeatherDetails';
import FiveDaysWeather from './components/FiveDaysWeather';

function App() {
  const [cityName, setCityName] = useState("London");
  const [updateCityWeatherData, setUpdateCityData] = useState(null);

  const updateCityName = (data) => {
    setCityName(data);
  }
  const updateCityData = (data) => {
    setUpdateCityData(data);
  }

  return (
    <div className="app bg-yellow-100">
      <Header />
      <Search searchData={updateCityData} cityNameData={updateCityName} />
      <div className='flex justify-center text-6xl m-16'>
        {cityName ? <WeatherDetails updateCityWeatherData={updateCityWeatherData} />
          : <ReactLoading type="balls" color="#000" height={'100px'} width={'50px'} />}
        {cityName ? <FiveDaysWeather cityNameVal={cityName} />
          : <ReactLoading type="balls" color="#000" height={'100px'} width={'50px'} />}
      </div>
      <Footer />
    </div>
  )
}

export default App
