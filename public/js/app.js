// import axios from "axios";
console.log("client side javascript file app.js is loaded");


const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=96696c15098f495880895701231508&q=Boston&days=1&aqi=no&alerts=no`;
    const fetchWeatherForecast = async (location) => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=96696c15098f495880895701231508&q=${location}&days=1&aqi=no&alerts=no`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data; // Return the fetched data
      } catch (err) {
        console.error(err);
        return null;
      }
    };

   fetch(apiEndpoint)
     .then((response) => {
       if (!response.ok) {
         throw new Error("Network response was not ok");
       }
       return response.json();
     })
     .then((data) => {
       console.log(data);
     })
     .catch((error) => {
       console.log(
         "There was a problem with the fetch operation:",
         error.message
       );
     });


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("locationForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const location = document.getElementById("locationInput").value;
    if (location) {
      console.log("You searched for:", location);
      const weatherData = await fetchWeatherForecast(location); // Wait for data to be fetched

      // Now, let's update the UI
      if (weatherData) {
        document.getElementById(
          "weatherLocation"
        ).textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
        document.getElementById(
          "weatherIcon"
        ).src = `http:${weatherData.current.condition.icon}`;
        document.getElementById("temperature").textContent =
          weatherData.current.temp_c;
        document.getElementById("weatherCondition").textContent =
          weatherData.current.condition.text;
        document.getElementById("windSpeed").textContent =
          weatherData.current.wind_kph;
      } else {
        alert("Failed to fetch weather data. Please try again.");
      }
    } else {
      alert("Please enter a location!");
    }
  });
});


 
