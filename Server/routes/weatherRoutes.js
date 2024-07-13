const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const BASE_URL = "https://api.openweathermap.org/data";
const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  // const token = req.cookies?.token;
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

const fetchWeatherData = async (city) => {
  if (!city) {
    throw new Error("City parameter is required");
  }

  const geocoing_api_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`;
  const weatherResponse = await axios.get(geocoing_api_url);

  const locationData = weatherResponse.data[0];

  if (!locationData) {
    throw new Error("City not found");
  }
  return locationData;
};

const weatherDetails = async (lat, lon) => {
  const weatherApiUrl = `${BASE_URL}/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`;
  const weatherResponse = await axios.get(weatherApiUrl);
  return weatherResponse.data;
};

router.get("/weather/current", authenticate, async (req, res) => {
  const { city } = req.query;
  try {
    const { lat, lon } = await fetchWeatherData(city);
    const weatherData = await weatherDetails(lat, lon);
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/weather/forecast", authenticate, async (req, res) => {
  const { city } = req.query;
  try {
    const { lat, lon } = await fetchWeatherData(city);

    const forecastApiUrl = `${BASE_URL}/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`;
    const forecastResponse = await axios.get(forecastApiUrl);

    let uniqueForeCastDays = [];
    let fivedaysforecast = forecastResponse.data.list.filter((forecast) => {
      let forcastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForeCastDays.includes(forcastDate)) {
        return uniqueForeCastDays.push(forcastDate);
      }
    });
    res.status(200).json(forecastResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/historical", authenticate, async (req, res) => {
  const { city } = req.query;
  try {
    const { lat, lon } = await fetchWeatherData(city);
    const historicalApiUrl = `${BASE_URL}/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${
      Math.floor(Date.now() / 1000) - 5 * 24 * 60 * 60
    }&appid=${process.env.WEATHER_API_KEY}`;
    const historicalResponse = await axios.get(historicalApiUrl);
    res.status(200).json(historicalResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
