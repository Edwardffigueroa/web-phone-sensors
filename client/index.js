let socket = io("http://172.20.10.2:5050", { path: "/real-time" });

// --- GEOLOCALIZATION

document
  .getElementById("location-button")
  .addEventListener("click", sendCurentGeolocation);

async function sendCurentGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
      console.log(position);
      socket.emit("user-location", position); // Sends a string message to the server
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
