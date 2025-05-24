// weather.js - Weather data functionality for Timbuktu Chamber of Commerce

// API key for OpenWeatherMap (replace with your actual API key)
const API_KEY = 'YOUR_API_KEY';
const CITY = 'Timbuktu';
const COUNTRY = 'ML';

// DOM Elements
const currentTempElement = document.getElementById('current-temp');
const weatherDescElement = document.getElementById('weather-desc');
const humidityElement = document.getElementById('humidity');
const weatherIconElement = document.getElementById('weather-icon');
const forecastContainer = document.getElementById('forecast-container');

// Fetch weather data from OpenWeatherMap API
async function fetchWeatherData() {
    try {
        // Current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`
        );
        
        if (!currentResponse.ok) {
            throw new Error(`HTTP error! status: ${currentResponse.status}`);
        }
        
        const currentData = await currentResponse.json();
        
        // Forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`
        );
        
        if (!forecastResponse.ok) {
            throw new Error(`HTTP error! status: ${forecastResponse.status}`);
        }
        
        const forecastData = await forecastResponse.json();
        
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayWeatherError();
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const iconCode = data.weather[0].icon;
    
    currentTempElement.textContent = `${temp}°C`;
    weatherDescElement.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    humidityElement.textContent = humidity;
    
    // Create weather icon
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
            <span>${temp}°C</span>
        `;
        
        forecastContainer.appendChild(forecastDay);
    });
}

// Display error message if weather fetch fails
function displayWeatherError() {
    currentTempElement.textContent = 'N/A';
    weatherDescElement.textContent = 'Weather data unavailable';
    forecastContainer.innerHTML = '<p>Forecast data unavailable</p>';
}

// Initialize weather functionality
document.addEventListener('DOMContentLoaded', fetchWeatherData);