let chathams_blue = "#1A4B84";
function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}
setTheme(localStorage.getItem("movie-theme") || chathams_blue);

const MAPBOX_API =
  "pk.eyJ1IjoiZ29waWtybSIsImEiOiJjbGVjamdlcTYwNDVkM29tdW84ZXM0OHJzIn0.QFjEknxbT-y6iB_ZPJb1-w";

const quotes = [
  "I am capable of achieving my goals.",
  "Today is going to be a great day.",
  "I am doing my best, and that's good enough.",
  "Good things are coming my way.",
  "My thoughts and feelings matter.",
];

const bgURL = [
  "./images/landing-bg-1.jpg",
  "./images/landing-bg-2.jpg",
  "./images/landing-bg-3.jpg",
  "./images/landing-bg-4.jpg",
  "./images/landing-bg-5.jpg",
];

const landingpageBg = document.getElementById("landingpageBg");
const greeting = document.getElementById("greet");
const greetName = document.getElementById("name");
const placeName = document.getElementById("place");
const quoteElement = document.getElementById("quote");
const time = document.getElementById("time");

const showAmPm = true;

const getLocationData = () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getData(latitude, longitude);
  };
  const error = () => {
    placeName.innerText = "Location unavailable";
  };
  navigator.geolocation.getCurrentPosition(success, error);
};

const getData = async (lat, long) => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=place&access_token=${MAPBOX_API}`;
    const response = await fetch(url);
    const locationData = await response.json();
    if (locationData.features && locationData.features.length > 0) {
      placeName.innerText = "Place - " + locationData.features[0].place_name;
    } else {
      placeName.innerText = "Place not found";
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    placeName.innerText = "Location unavailable";
  }
};

const getQuote = () => {
  const random = Math.floor(Math.random() * quotes.length);
  quoteElement.innerText = quotes[random];
  landingpageBg.style.backgroundImage = `url(${bgURL[random]}), linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`;
};

function displayTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  const amPm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ""}`;

  setTimeout(displayTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function greetings() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 12) {
    greeting.textContent = `Good Morning, `;
  } else if (hour < 16) {
    greeting.textContent = `Good Afternoon, `;
  } else {
    greeting.textContent = `Good Evening, `;
  }
}

function getName() {
  const storedName = localStorage.getItem("name");
  if (storedName === null || storedName.trim() === "") {
    greetName.textContent = "[Enter Name]";
  } else {
    greetName.textContent = storedName;
  }
}

function setName(e) {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      if (greetName.innerText.trim().length === 0) {
        greetName.textContent = "[Enter Name]";
        return;
      }
      localStorage.setItem("name", e.target.innerText.trim());
      greetName.blur();
    }
  }
}

function checkEscKeyPress(e) {
  if (e.type === "keydown") {
    if (e.which === 27 || e.key === "Escape") {
      greetName.blur();
    }
  }
}

function mouseClicked() {
  greetName.textContent = "[Enter Name]";
  localStorage.setItem("name", "[Enter Name]");
}

greetName.addEventListener("keypress", setName);
greetName.addEventListener("keydown", checkEscKeyPress);
greetName.addEventListener("click", mouseClicked);

getLocationData();
displayTime();
getQuote();
greetings();
getName();
