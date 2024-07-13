import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosService";
import { useSelector } from "react-redux";

const FivedayForecast = () => {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const {search}  = useSelector((store) => store.user);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axiosInstance.get("/weather/forecast", {
          params: { city: "calicut" },
        });
        setForecast(response.data);
      } catch (err) {
        console.error("Error fetching forecast:", err);
        setError("An error occurred while fetching the forecast.");
      }
    };

    fetchForecast();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!forecast) {
    return <div>Loading...</div>;
  }

  const uniqueForecastDays = [];
  const filteredForecasts = forecast.list.filter((forecast) => {

    const forecastDate = new Date(forecast.dt_txt);
    

    if (!uniqueForecastDays.includes(forecastDate)) {
      uniqueForecastDays.push(forecastDate);
      return true;
    }
    return false;
  });

  return (
    <div className="overflow-x-scroll">
      <h1 className=" bg-slate-700 text-white p-2 mx-2 sticky left-2">5-Day Forecast for {search}</h1>
<div className="flex w-full ">
        {filteredForecasts.map((day, index) => (
          <div className="bg-slate-800 text-white p-3 rounded-xl w-fit m-2" key={index}>
            <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>

            <p>Temperature: {day.main.temp}°C</p>
            <p>Humidity: {day.main.humidity}%</p>
            <p>Conditions: {day.weather[0].description}</p>
            <p>Wind Speed: {day.wind_speed} m/s</p>
          </div>
        ))}</div>

    </div>
  );
};

export default FivedayForecast;
