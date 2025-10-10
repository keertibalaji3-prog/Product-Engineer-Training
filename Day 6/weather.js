const API_KEY = '2cb9f1294d3c6674cc72a9ec1b87affb';

const searchbtn = document.getElementById("searchbtn");
const cityInp = document.getElementById("city_name");
const errorMessage = document.getElementById("errorMessage");

const  cityName = document.getElementsByClassName("city")[0];
const humidity = document.getElementsByClassName("humidity")[0];
const temperature = document.getElementsByClassName("temp")[0];
const weatherimgContainer = document.getElementsByClassName("weather-img-container")[0];

async function fetchWea(city) {
    if(!city.trim()){
        showError("!! Please Enter a city name");
        return;
    }

    searchbtn.disabled = true;
    searchbtn.textContent = "Loading.....";
    hideError();
    clearWeaData();

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        if(!response.ok){
            if(response.status === 404){
                throw new Error("!! City not found. Please try again !!");
            }
            else if (response.status === 401) {
                throw new Error("!! API authentication failed. Please check your API key !!");
            }
            else {
                throw new Error("Failed to get weather data. Please try again later");
            }
        }

        const data = await response.json();
        disWeather(data);
    }
    catch(error) {
        showError(error.message);
        clearWeaData();
    }
    finally {
        searchbtn.disabled = false;
        searchbtn.textContent= "Search";
    }
}

function disWeather(data) {
    console.log(data);

    cityName.textContent = data.name;
    temperature.textContent = `${data.main.temp}°C`;
    humidity.textContent = `${data.main.humidity}%`;

    const icon = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`; 
    weatherimgContainer.innerHTML = `<img src="${iconURL}" alt="${data.weather[0].description}"> `;

}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function hideError(){
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';

}

function clearWeaData() {
    cityName.textContent = '';
    temperature.textContent= '';
    humidity.textContent = '';
    weatherimgContainer.innerHTML = '';
}

searchbtn.addEventListener('click',() =>{
    const city = cityInp.value;
    fetchWea(city);
});

cityInp.addEventListener('keypress',(e) => {
    if(e.key === 'Enter'){
        const city = cityInp.value; 
        fetchWea(city);
    }
});