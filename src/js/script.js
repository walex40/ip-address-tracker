"use strict";

import differentImage from "../images/icon-location.svg";

const searchBar = document.querySelector(".form__field");
const submitBtn = document.querySelector(".form__btn");
const searchList = document.querySelector(".nav");

const userAction = function (res) {
  const inner = `
      <div class="nav__item">
          <h1>ip address</h1>
          <span>${res.ip}</span>
        </div>

        <div class="nav__item">
          <h1>location</h1>
          <span
            >${res.location.region}, ${res.location.country} <br />
            ${res.as.asn}</span
          >
        </div>

        <div class="nav__item">
          <h1>time zone</h1>
          <span>UTC${res.location.timezone}</span>
        </div>

        <div class="nav__item">
          <h1>isp</h1>
          <span>${res.as.name}</span>
        </div>
  `;
  searchList.innerHTML = inner;
};

const getLocation = function (corr) {
  let map = L.map("map").setView([corr.location.lat, corr.location.lng], 13);

  console.log(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // let myIcon = L.divIcon({ className: "my-div-icon" });

  let customIcon = L.icon({
    iconUrl: differentImage,
    iconSize: [40, 50],
  });

  L.marker([corr.location.lat, corr.location.lng], { icon: customIcon }).addTo(
    map
  );
};

const getIpAddress = function (ipAddress) {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_cBNRWQkYEVZMRKWAHt0fBFkX2pGC2&ipAddress=${ipAddress}`
  )
    .then((response) => response.json())
    .then((data) => {
      userAction(data);
      getLocation(data);
    });
};

const getInput = function (e) {
  let input = searchBar.value;
  e.preventDefault();
  getIpAddress(input);
};

const getSearchInput = function (e) {
  let input = searchBar.value;
  if (e.key == "Enter" && input != "") {
    e.preventDefault();
    getIpAddress(input);
  }
};

submitBtn.addEventListener("click", getInput);
searchBar.addEventListener("keydown", getSearchInput);

localStorage.setItem("theme", "light");
localStorage.setItem("backgroundColor", "white");
localStorage.setItem("color", "#111");

let keys = Object.keys(localStorage);
for (let key of keys) {
  console.log(`${key}: ${localStorage.getItem(key)}`);
}

const settings = {
  backgroundColor: "#fff",
  color: "#111",
  theme: "light",
};

localStorage.setItem("settings", JSON.stringify(settings));

console.log(localStorage.getItem("settings"));

addEventListener("storage", function (e) {
  console.log(`The value of the ${e.key} changed for the ${e.domain}.`);
});
