import { useState } from "react";
import "./App.css";

const api = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [query, setQuery] = useState(""); // query is the city name
  const [weather, setWeather] = useState({}); // weather is the weather data

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api}`)
        .then((response) => response.json())
        .then((response) => {
          setQuery(""); // reset the query
          setWeather(response);
          console.log(response);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  let weatherClass = "app cloudy"; // Default class in case none of the conditions match

  if (typeof weather.main !== "undefined") {
    if (weather.weather[0].description.includes("clear sky")) {
      weatherClass = "app";
    } else if (weather.weather[0].description.includes("cloud")) {
      weatherClass = "app cloudy";
    } else if (weather.weather[0].description.includes("rain")) {
      weatherClass = "app rainy";
    } else if (weather.weather[0].description.includes("snow")) {
      weatherClass = "app snowy";
  }}

  return (
    <div className={weatherClass}>
      <div className="container">
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Type a city here..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div className="all-info-container">
            <div className="overlay"></div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="temp-range">
                Highest Temperature: {Math.round(weather.main.temp_max)}°C
                <br />
                Lowest Temperature: {Math.round(weather.main.temp_min)}°C
              </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
