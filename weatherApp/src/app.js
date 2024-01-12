"use strict";

const form = document.querySelector('form');
const msg = document.querySelector('.msg');
const cities = document.querySelector('.cities');
const input = document.querySelector('input[name]');
const APIkey = '28be9ccdc2c3bd1bca213bcad8165473'; //742d340226f94c6ad754526df79b475f
const findedCities = [];

// form.addEventListener('submit', fetchWeather);
form.addEventListener('submit', fetchWeatherAsync);

function fetchWeather(event) {
  event.preventDefault();
  const inputValue = input.value;


  if (inputValue.trim() === '') {
    input.focus();
    return null;
  }

  if (findedCities.includes(inputValue.toLowerCase())) {
    msg.innerHTML = `You already know the weather for ${inputValue}.`;
    return null;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${APIkey}&units=metric`).then(resp => {
    if (!resp.ok) {
      throw new Error('Something wrong');
    }

    return resp.json();

  }).then(renderCity).catch(err => {
    msg.innerHTML = err.message;
  });
}

function renderCity(data) {
  console.log(data);
  form.reset();
  const { main, sys, weather, name } = data;
  if (findedCities.includes(name.toLowerCase())) {
    msg.innerHTML = `You already know the weather for ${name}.`;
    return null;
  }
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`;

  const li = document.createElement('li');
  li.classList.add('city');

  const markup = `
    <h2 class="city-name">
      <span>${name}</span>
      <sup>${sys.country}</sup>
    </h2>
    <div class="city-temp">${Math.round(main.temp)}</div>
    <img class="city-icon" src="${icon}" alt="${name}"/>
    <span>${weather[0]['description']}</span>
  `;

  li.innerHTML = markup;

  cities.appendChild(li);

  findedCities.push(name.toLowerCase());
}

// async

async function fetchWeatherAsync(event) {
  event.preventDefault();
  const inputValue = input.value;


  if (inputValue.trim() === '') {
    input.focus();
    return null;
  }

  if (findedCities.includes(inputValue.toLowerCase())) {
    msg.innerHTML = `You already know the weather for ${inputValue}.`;
    return null;
  }

  try {
    let resp = await fetch(`https://api.sopenweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${APIkey}&units=metric`);
      if (!resp.ok) {
        throw new Error('Something wrong');
      }
  
    let data = await resp.json();
  
    renderCity(data);
    
  } catch(err) {
    msg.innerHTML = err.message + '_test';
  }
} 