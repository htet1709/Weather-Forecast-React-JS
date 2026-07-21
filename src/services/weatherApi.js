import axios from "axios";

const API_KEY =
  import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL =
  "https://api.weatherapi.com/v1";

export const getWeather = async (city) => {
  const response = await axios.get(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no&lang=ja`
  );

  return response.data;
};