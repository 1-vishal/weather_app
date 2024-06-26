import React, { useState, useEffect } from 'react';
import LayoutComponent from './layoutComponent';

const FiveDaysWeather = (props) => {
    return (
        <div className='text-3xl mt-12'>
            <div className="flex justify-center gap-5 w-full flex-wrap">
                {props.fiveDaysWeatherData && props.fiveDaysWeatherData.map((dayData, index) => (
                    <div key={index} className="" onClick={() => props.updateCurrentData(dayData)}>
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
