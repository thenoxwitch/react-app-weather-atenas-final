import React, { useState } from "react";
import "./Search.css";
import axios from "axios";
import "./styles.css";

export default function Search() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("{}");
  let [loading, setLoading] = useState(false);

  function displayWeather(response) {
    setLoading(true);

    setWeather({
      temperature: response.data.main.temp,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      info: response.data.weather[0].description,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=701f06352d61835bc4fc894e7b084629&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city here"
        onChange={updateCity}
      />
      <button type="Submit">Search</button>
    </form>
  );

  if (loading) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature:{Math.round(weather.temperature)}°C</li>
          <li>Info: {weather.info}</li>
          <li>Wind:{Math.round(weather.wind)}Km/h</li>
          <li>Humidity:{weather.humidity}%</li>

          <li>
            <img src={weather.icon} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
