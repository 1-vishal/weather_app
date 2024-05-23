import { useState, useEffect } from 'react'


export default function layoutCompnent(props) {

  const [temp, setTemp] = useState("24")
  const [iconId, setIconId] = useState("04d");
  const [description, setDescription] = useState("Cloudy");

  useEffect(() => {
    setTemp(props.temp);
    setIconId(props.icon);
    setDescription(props.description);
  }, [props]);

  return (
    <div className='bg-gradient-to-tr from-blue-100 to-yellow-300 p-4 rounded-3xl text-blue-400 shadow-2xl' style={{ width: '160px' }}>
      <div className="flex justify-center">
        <img src={`http://openweathermap.org/img/wn/${iconId}@4x.png`} className='w-24' alt="" />
      </div>
      <div className="text-3xl text-center">{temp}°c</div>
      <div className="text-2xl text-center capitalize">{description}
      </div>
    </div>
  )
}
