import React from 'react'
import WeatherCard from '../../components/header/weatherCard'
import FivedayForecast from '../../components/header/FivedayForecast'
import Favouritecities from '../../components/header/favouritecities'
const dashboard = () => {
  return (
    <div 
    className='bg-violet-600 flex h-full'>
    
      <WeatherCard/>

      <div className="flex flex-col overflow-hidden">   <FivedayForecast/>
<Favouritecities/>   
    </div>
    </div>
  )
}

export default dashboard