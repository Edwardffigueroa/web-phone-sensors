// let socket = io("http://172.20.10.2:5050", { path: "/real-time" });

import { drawAxes, handleMotionEvent } from "./accelerometer-visualizer.js";

// ------------- GEOLOCALIZATION

document
  .getElementById("location-button")
  .addEventListener("click", sendCurentGeolocation);

async function sendCurentGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
      console.log("GEOLOCALIZATION", position);
      // socket.emit("user-location", position); // Sends a string message to the server
      const dataDiv = document.getElementById("data");
      dataDiv.innerHTML = `
          <p>LOCATION</p>
          <p>LAT: ${position?.coords?.latitude}, LONG: ${position?.coords?.longitude}
        `;
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// ------------- GYROSCOPE SENSOR

document
  .getElementById("acceletometer-button")
  .addEventListener("click", initMotionEvent);

// Request permission and initialize motion event on user interaction (e.g., button click)
function initMotionEvent() {
  if (window.DeviceMotionEvent) {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            window.addEventListener("devicemotion", handleMotionEvent);
          } else {
            alert("Permission to access device motion data denied.");
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener("devicemotion", handleMotionEvent);
    }
  } else {
    console.log("DeviceMotionEvent is not supported by this browser.");
  }
}

drawAxes()
