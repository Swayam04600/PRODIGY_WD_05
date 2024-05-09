const apiKey = "d14131c75faf16a62a4320ff72299d24";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const errorDiv = document.getElementById("error-message");
const loadingDiv = document.getElementById("loading");
const weatherBox = document.getElementById("weather-box");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const cityName = document.getElementById("city-name");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

// Weather icons mapping
const weatherIcons = {
    clear: "./image/clear.jpg",
    clouds: "./image/cloud.jpg",
    rain: "./image/rain.jpg",
    drizzle: "./image/drizzle.jpg",
    mist: "./image/mist.jpg",
    snow: "./image/snow.jpg",
    thunderstorm: "./image/thunderstorm.png",
    default: "./image/clear.jpg"
};

async function fetchWeatherData(city) {
    try {
        // Show loading indicator
        loadingDiv.style.display = "block";
        errorDiv.style.display = "none";

        // Fetch data from the API
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        // Handle HTTP errors
        if (!response.ok) {
            if (response.status === 404) {
                errorDiv.textContent = "Invalid city name. Please try again.";
            } else {
                errorDiv.textContent = "An error occurred. Please try again later.";
            }
            errorDiv.style.display = "block";
            weatherBox.style.display = "none";
            return;
        }

        const data = await response.json();

        // Update UI with weather data
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} km/h`;

        // Set the appropriate weather icon
        const weatherCondition = data.weather[0].main.toLowerCase();
        console.log(`Weather condition: ${weatherCondition}`);
        const iconPath = weatherIcons[weatherCondition] || weatherIcons.default;
        console.log(`Using icon path: ${iconPath}`);
        
        weatherIcon.src = iconPath;

        // Display weather data and hide error message
        weatherBox.style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorDiv.textContent = "An error occurred while fetching weather data. Please try again later.";
        errorDiv.style.display = "block";
        weatherBox.style.display = "none";
    } finally {
        // Hide loading indicator
        loadingDiv.style.display = "none";
    }
}

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        errorDiv.textContent = "Please enter a city name.";
        errorDiv.style.display = "block";
        weatherBox.style.display = "none";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", handleSearch);

// Event listener for "Enter" key on the input field
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});
