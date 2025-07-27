document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const API_KEY = '4b66ca4c1b01bf6935c7b42d6264dfcb';

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showErrorMessage();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(Data) {
    console.log(Data);
    const {name,main,weather} = Data;
    cityName.textContent = name;
    temperature.textContent = `${main.temp} °C`;
    description.textContent = weather[0].description;
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    }

    function showErrorMessage() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});