import { useState, useEffect } from 'react'

import axios from 'axios';
import Search from './components/Search';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

import WeatherDetails from './components/WeatherDetails';
import FiveDaysWeather from './components/FiveDaysWeather';
import LineChart from './components/LineChart';

function App() {
  const [cityName, setCityName] = useState("Delhi");
  const [updateCityWeatherData, setUpdateCityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [fiveDaysWeatherData, setFiveDaysWeatherData] = useState(null);
  const [currentWeather3hrData, setCurrentWeather3hrData] = useState(null);
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        backgroundColor: function (context) {
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        color: 'white',
        font: {
          weight: 'bold'
        },
        formatter: Math.round,
        padding: 6
      }
    },
    scales: {
      y: {
        display: false,
        stacked: true,
        min: -10,
        max: 100,
        grid: {
          display: false
        },
      },
      x: {
        display: true,
        grid: {
          display: false
        }
      },
    }
  }

  useEffect(() => {
    getCurrentCityName();
  }, []);

  const getCurrentCityName = async () => {
    let lat, lon;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        const url = "https://weather-api-ayxd.onrender.com/cityNameByPos";
        await axios.post(url, { lat: lat, lon: lon }).then(function (response) {
          if (response) {
            handleSearch(response.data)
          }
        }).catch(function (error) {
          console.log(error);
        });
      })
    }
  }
  const handleSearch = async (cityVal) => {
    setCityName(cityVal);
    const url = "https://weather-api-ayxd.onrender.com/currentWeather";
    await axios.post(url, { cityName: cityVal !== "" ? cityVal : cityName }).then(function (response) {
      if (response.data.cod !== 200) {
        return alert(response.data.message)
      }
      setUpdateCityData(response.data);
      apiCall(cityVal !== "" ? cityVal : cityName);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  const apiCall = async (cityNameVal) => {
    const url = "https://weather-api-ayxd.onrender.com/fiveDaysWeather";
    try {
      const response = await axios.post(url, { cityName: cityNameVal });
      let result = [];
      setWeatherData(response.data.list);
      Object.keys(response.data.list).forEach((key) => {
        result.push(response.data.list[key][0]);
      });
      handleChartData(result[0].dt_txt, response.data.list);
      setFiveDaysWeatherData(result);
    } catch (error) {
      console.log(error);
    }
  };
  const getFormattedDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const handleChartData = (date, data) => {
    let newDate = getFormattedDate();
    let diff = parseInt(date.split(" ")[0].split("-")[2]) - parseInt(newDate.split(" ")[0].split("-")[2]);
    let key = `Day${diff + 1}`;
    let chartData = weatherData ? weatherData : data;
    setCurrentWeather3hrData(chartData[key]);
  }
  const updateCurrentData = (data) => {
    data.name = cityName;
    handleChartData(data.dt_txt, null);
    setUpdateCityData(data);

  }



  return (
    <div className="app bg-yellow-100">
      <Header />
      <Search handleSearch={handleSearch} />
      <div className='flex justify-center text-6xl m-16 flex-wrap'>
        <WeatherDetails updateCityWeatherData={updateCityWeatherData} />
        {currentWeather3hrData &&
          <div className="ml-4 mr-4">
            <FiveDaysWeather fiveDaysWeatherData={fiveDaysWeatherData} updateCurrentData={updateCurrentData} />
            <LineChart currentWeather3hrData={currentWeather3hrData} updateCurrentData={updateCurrentData} />
          </div>
        }
      </div>
      <Footer />
    </div>
  )
}

export default App
