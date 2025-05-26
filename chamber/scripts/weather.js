// weather.js - Weather data functionality for Timbuktu Chamber of Commerce

// API Configuration
const API_KEY = '136b22b129bedd793f93911bae13beae'; // ← Your actual key here
const CITY = 'Ogun';
const COUNTRY = 'NG'; // Use 'US' for United States, 'NG' for Nigeria, etc.
const UNITS = 'metric'; // Use 'imperial' for Fahrenheit

// DOM Elements
const currentTempElement = document.getElementById('current-temp');
const weatherDescElement = document.getElementById('weather-desc');
const humidityElement = document.getElementById('humidity');
const weatherIconElement = document.getElementById('weather-icon');
const forecastContainer = document.getElementById('forecast-container');

// Fetch weather data from OpenWeatherMap API
async function fetchWeatherData() {
    try {
        // 1. Fetch current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=${UNITS}&appid=${API_KEY}`
        );
        
        if (!currentResponse.ok) {
            throw new Error(`Current weather error: ${currentResponse.status}`);
        }
        
        const currentData = await currentResponse.json();
        
        // 2. Fetch forecast data
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=${UNITS}&appid=${API_KEY}`
        );
        
        if (!forecastResponse.ok) {
            throw new Error(`Forecast error: ${forecastResponse.status}`);
        }
        
        const forecastData = await forecastResponse.json();
        
        // 3. Update the UI
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayWeatherError();
    }
}

// Display current weather data
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const iconCode = data.weather[0].icon;
    
    currentTempElement.textContent = `${temp}°${UNITS === 'metric' ? 'C' : 'F'}`;
    weatherDescElement.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    humidityElement.textContent = humidity;
    
    // Display weather icon from OpenWeatherMap
    weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${desc}">`;
}

// Display 3-day forecast
function displayForecast(data) {
    // Filter to get one forecast per day (around noon)
    const dailyForecasts = data.list.filter(item => {
        const time = new Date(item.dt * 1000).getHours();
        return time >= 11 && time <= 13;
    }).slice(0, 3); // Get next 3 days
    
    forecastContainer.innerHTML = '';
    
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const iconCode = day.weather[0].icon;
        
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <span>${dayName}</span>
            <span><img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${day.weather[0].description}"></span>
            <span>${temp}°${UNITS === 'metric' ? 'C' : 'F'}</span>
        `;
        
        forecastContainer.appendChild(forecastDay);
    });
}

// Display error message if weather fetch fails
function displayWeatherError() {
    currentTempElement.textContent = '--';
    weatherDescElement.textContent = 'Weather data unavailable';
    humidityElement.textContent = '--';
    forecastContainer.innerHTML = '<p>Forecast unavailable</p>';
}

// Initialize weather when page loads
document.addEventListener('DOMContentLoaded', fetchWeatherData);