import { useState, useEffect } from 'react'
import './styles/App.css';

import WeatherDetails from './components/WeatherDetails';

function App() {
  return (
    <div className="app">
        <WeatherDetails />
    </div>
  )
}

export default App
