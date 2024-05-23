import React, { useState, useEffect } from 'react';
import LayoutComponent from './LayoutComponent';
import axios from 'axios';

const FiveDaysWeather = (props) => {
    const [weatherData, setWeatherData] = useState(null);
    const [fiveDaysWeatherData, setFiveDaysWeatherData] = useState(null);

    useEffect(() => {
        if (props.cityNameVal) {
            const url = "http://localhost:3000/fiveDaysWeather";
            apiCall(url);
        }
    }, [props.cityNameVal]);

    const apiCall = async (url) => {
        try {
            const response = await axios.post(url, { cityName: props.cityNameVal });
            let result = [];
            Object.keys(response.data.list).forEach((key) => {
                result.push(response.data.list[key][0]);
            });
            setWeatherData(response.data.list);
            setFiveDaysWeatherData(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='text-3xl'>
            <div className="grid grid-rows-3 grid-flow-col gap-5 w-full">
                {fiveDaysWeatherData && fiveDaysWeatherData.map((dayData, index) => (
                    <div key={index} className="">
                        <LayoutComponent
                            temp={dayData.main.temp}
                            humidity={dayData.main.humidity}
                            speed={dayData.wind.speed}
                            name={props.cityNameVal}
                            icon={dayData.weather[0].icon}
                            description={dayData.weather[0].description}
                            weekday={dayData.day}
                        />
                        <div className="text-2xl text-blue-400 text-center">{dayData.day}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FiveDaysWeather;
