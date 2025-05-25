export async function getCurrentWeather() {
    const weather = {
        "location": "Melaka, Malaysia",
        "temperature": 30,
        "condition": "Sunny",
        "humidity": 70,
        "wind_speed": 10
    }
    return JSON.stringify(weather);
} 

export async function getLocation() {
    return "Melaka, Malaysia";
}


