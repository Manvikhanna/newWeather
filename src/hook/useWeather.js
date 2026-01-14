import { useState } from "react";
import { getCurrentWeather, getCurrentWeatherByCoords, getForecast, getForecastByCoords } from "../services/weatherService";

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔍 CITY SEARCH
  const fetchWeather = async (city, unit) => {
    try {
      setLoading(true);
      setError("");

      const weather = await getCurrentWeather(city, unit);
      const forecastData = await getForecast(city, unit);

      setData(weather);
      setForecast(forecastData.list.filter((_, i) => i % 8 === 0));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 📍 GEOLOCATION
  const fetchWeatherByLocation = async (lat, lon, unit) => {
    try {
      setLoading(true);
      setError("");

      const weather = await getCurrentWeatherByCoords(lat, lon, unit);
      const forecastData = await getForecastByCoords(lat, lon, unit);

      setData(weather);
      setForecast(forecastData.list.filter((_, i) => i % 8 === 0));
    } catch (err) {
      setError("Location access denied or unavailable");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    forecast,
    loading,
    error,
    fetchWeather,
    fetchWeatherByLocation, // 👈 IMPORTANT
  };
};
