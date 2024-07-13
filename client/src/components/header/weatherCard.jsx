import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosService';
import FavoriteButton from './favourite';
import { useSelector } from 'react-redux';

const CurrentWeather = () => {
  const [current, setcurrent] = useState(null);
  const [error, setError] = useState(null);
  const { search } = useSelector((store) => store.user);


  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const response = await axiosInstance.get('/weather/current', {
          params: { city: search },
        });
        setcurrent(response.data);
      } catch (err) {
        console.error('Error fetching Current:', err); 
        setError('An error occurred while fetching the current.');
      }
    };

    fetchCurrent();
  }, [search]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!current) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-white p-5  bg-gray-700 w-fit rounded-xl'>
    <FavoriteButton />
    <div>
      <h2>current weather in {current.name}</h2>
      <p>Temperature: {current.main.temp}°C</p>
      <p>Humidity: {current.main.humidity}%</p>

      
    
      <p>Conditions: {current.weather[0].description}</p>
      <p>Wind Speed: {current.wind.speed} m/s</p>
    </div>

    </div>
  );
};

export default CurrentWeather;
