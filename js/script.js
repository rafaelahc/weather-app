// Variáveis
const apiKey = '2c021cb45544c7353919352b0afb36e0';
const apiCountryUrl = 'https://countryflagsapi.com/png/';

const cityInput = document.querySelector('#city-input');
const btnSearch = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description-weather');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country-flag');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('.weather-data');
const errorMessageContainer = document.querySelector('#error-message');
const loader = document.querySelector("#loader");

//Loader
const toggleLoader = () => {
    loader.classList.toggle('hide');
}

//Funções
const getWeatherData = async(city) => {

    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();

    return data;

}

//Tratamento de Erros
const errorMessage = () => {
    errorMessageContainer.classList.remove('hide');
}

const hideInformation = () => {
    errorMessageContainer.classList.add('hide');
    weatherContainer.classList.add('hide');

}

const showWeatherData = async (city) => {
    hideInformation();
    
    const data = await getWeatherData(city);


    if(data.cod === '404'){
        errorMessage();  
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    console.log(countryElement);
    countryElement.setAttribute('src', apiCountryUrl + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove('hide');
}



//Eventos
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    
    
    showWeatherData(city);
})

cityInput.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        const city = e.target.value;

        showWeatherData(city);

        cityInput.value = '';
    }
})