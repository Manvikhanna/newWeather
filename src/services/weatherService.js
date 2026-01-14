const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city, unit) => {
  const res = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`);

  const data = await res.json();
  const code = Number(data.cod);

  if (!res.ok) {
    if (code === 400) {
      throw new Error("Please enter a valid city name");
    }
    if (code === 401) {
      throw new Error("Invalid or inactive API key");
    }
    if (code === 404) {
      throw new Error("City not found");
    }
    if (code === 429) {
      throw new Error("API limit exceeded");
    }
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getForecast = async (city, unit) => {
  const res = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`);

  const data = await res.json();
  const code = Number(data.cod);

  if (!res.ok) {
    if (code === 400) {
      throw new Error("Please enter a valid city name");
    }
    if (code === 404) {
      throw new Error("Forecast not found");
    }
    if (code === 429) {
      throw new Error("API limit exceeded");
    }
    throw new Error(data.message || "Forecast error");
  }

  return data;
};

export const getCurrentWeatherByCoords = async (lat, lon, unit) => {
  const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);

  const data = await res.json();
  const code = Number(data.cod);

  if (!res.ok) {
    if (code === 401) {
      throw new Error("Invalid or inactive API key");
    }
    if (code === 429) {
      throw new Error("API limit exceeded");
    }
    throw new Error("Unable to fetch weather for your location");
  }

  return data;
};

export const getForecastByCoords = async (lat, lon, unit) => {
  const res = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);

  const data = await res.json();
  const code = Number(data.cod);

  if (!res.ok) {
    if (code === 429) {
      throw new Error("API limit exceeded");
    }
    throw new Error("Unable to fetch forecast for your location");
  }

  return data;
};
