import { useEffect, useState } from "react";
import Search from "../Search/Search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  async function fetchWeatherData(params) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=fda7a4e4ee777a5db8227bf7fb469a1c`
      );
      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  useEffect(() => {
    fetchWeatherData("Okara");
  }, []);

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex flex-col items-center justify-center px-4">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
      />
      {loading ? (
        <div className="flex flex-col items-center justify-center pt-5 space-y-4">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4 animate-spin border-t-blue-500 border-b-indigo-600"></div>
          <span className="text-white text-2xl font-semibold animate-pulse">
            Fetching Weather Data...
          </span>
        </div>
      ) : (
        <div className="bg-white bg-opacity-80 rounded-xl shadow-xl p-8 w-full max-w-md mt-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {weatherData?.name}, {weatherData?.sys?.country}
            </h1>
            <p className="text-sm text-gray-600 mt-2">{getCurrentDate()}</p>
          </div>
          <div className="text-center mt-6">
            <h2 className="text-6xl font-bold text-gray-900">
              {Math.round(weatherData?.main?.temp - 273.15)}°C
            </h2>
            <p className="text-lg text-gray-600 mt-2 capitalize">
              {weatherData.weather && weatherData.weather[0].description}
            </p>
          </div>
          <div className="flex justify-between mt-8 text-gray-700">
            <div className="text-center">
              <p className="text-lg font-bold">
                {weatherData?.wind?.speed} m/s
              </p>
              <p className="text-sm">Wind Speed</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">
                {weatherData?.main?.humidity}%
              </p>
              <p className="text-sm">Humidity</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
