let w_location = document.querySelector(".weather_city");
let date_time = document.querySelector(".weather_date_time");

let w_forecast = document.querySelector(".weather_forecast");
let weather_icon = document.querySelector(".weather_icon");

let minTemp = document.querySelector(".weather_min");
let maxTemp = document.querySelector(".weather_max");

let temp = document.querySelector(".temp");
let feels_like = document.querySelector(".weather_feelslike");

let humidity = document.querySelector(".weather_humidity");
let wind_speed = document.querySelector(".weather_wind");

let pressure = document.querySelector(".weather_pressure");
let weather_search = document.querySelector('.weather_search')
let city_name = 'mumbai';

weather_search.addEventListener('submit',(e)=>{
  e.preventDefault();  
  city_name = "" + search.value;
  search.value = "";
  getWeatherInfo();
})

let getCounty = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

let getTime = (dt) => {
  let dateObj = new Date(dt * 1000);
  let hours = dateObj.getHours();

  let minutes = dateObj.getMinutes();
  let formate = hours >= 12 ? "PM" : "AM";

  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = hours + ":" + minutes + " " + formate;
  return time;
};

let getDate = () => {
  let dateObj = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
};

async function getWeatherInfo() {
  try { 
    let API = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&APPID=375cb8367e49f3897cf05ec0e07ada95`;

    let data = await fetch(API);
    data = await data.json();
    console.log(data);

    let { name, dt, weather, main, wind, sys } = data;

    w_location.textContent = `${name}, ${getCounty(sys.country)}`;
    date_time.innerHTML = getDate(sys.country) + " at " + getTime(dt);

    w_forecast.textContent = weather[0].main;
    weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    temp.innerHTML = main.temp + "&#176";

    minTemp.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    maxTemp.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
    feels_like.innerHTML = `${main.feels_like.toFixed()}&#176`;

    humidity.innerHTML = main.humidity + "%";
    wind_speed.innerHTML = wind.speed + " m/s";
    pressure.innerHTML = main.pressure + " hPa";
  } catch (err) {
    console.log(err);
  }
}

document.body.addEventListener("load", getWeatherInfo());