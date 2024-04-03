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
            >${res.city}, ${res.region_code} <br />
            ${res.postal}</span
          >
        </div>

        <div class="nav__item">
          <h1>time zone</h1>
          <span>UTC${res.utc_offset}</span>
        </div>

        <div class="nav__item">
          <h1>isp</h1>
          <span>${res.org}</span>
        </div>
  `;
  searchList.innerHTML = inner;
};

const initializingMap = function () {
  let container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }
};

const getLocation = function (corr) {
  initializingMap();
  let map = L.map("map").setView([corr.latitude, corr.longitude], 13);

  console.log(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let customIcon = L.icon({
    iconUrl: differentImage,
    iconSize: [40, 50],
  });

  L.marker([corr.latitude, corr.longitude], { icon: customIcon }).addTo(map);
};

const getIpAddress = function (ipAddress) {
  fetch(` https://ipapi.co/${ipAddress}/json/ `)
    .then((response) => response.json())
    .then((data) => {
      userAction(data);
      getLocation(data);
    })
    .catch((err) => console.log(err));
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
    console.log(getIpAddress(input));
  }
  const searchValue = localStorage.setItem("search", input);
  console.log(localStorage.getItem(searchValue));
  // const storedInput = localStorage.getItem("search", searchBar.value);
  // console.log(storedInput);
};

submitBtn.addEventListener("click", getInput);
searchBar.addEventListener("keydown", getSearchInput);

// localStorage.getItem(searchBar);
// console.log(localStorage);
