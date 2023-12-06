import axios from 'axios';

let api_key = "c7230377ffd66244629aeac2a930d1ee"

export const getCurrentWeather = async(lat, lng)=>{    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`;
    let data;
    // Make the Axios GET request
     await axios
      .get(apiUrl)
      .then((response) => {
        // Handle the response data
        console.log("res:", response.data)
        data = response.data;
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
      return data;
}

export const getlocationSearch = async(searchValue)=>{    
  console.log(searchValue)
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${api_key}`;
    let data;
    // Make the Axios GET request
     await axios
      .get(apiUrl)
      .then((response) => {
        // Handle the response data
        console.log("res:", response.data)
        data = response.data;
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
      return data;
}