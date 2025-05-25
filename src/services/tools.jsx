export async function getCurrentWeather(location = "Melaka, Malaysia") {
  const weatherData = {
    "Melaka, Malaysia": {
      location: "Melaka, Malaysia",
      temperature: 30,
      condition: "Sunny",
      humidity: 70,
      wind_speed: 10,
    },
    "New York": {
      location: "New York, NY",
      temperature: 15,
      condition: "Cloudy",
      humidity: 60,
      wind_speed: 8,
    },
    "Tokyo": {
      location: "Tokyo, Japan",
      temperature: 22,
      condition: "Partly Cloudy",
      humidity: 65,
      wind_speed: 5,
    },
    "London": {
      location: "London, UK",
      temperature: 12,
      condition: "Rainy",
      humidity: 85,
      wind_speed: 15,
    },
  };

  const weather = weatherData[location] || {
    location: location,
    temperature: 30,
    condition: "Clear",
    humidity: 50,
    wind_speed: 5,
  };
  return JSON.stringify(weather);
}

export async function getLocation(userLocation = null) {
  return userLocation || "Melaka, Malaysia";
}
