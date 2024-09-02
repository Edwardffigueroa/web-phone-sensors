const canvas = document.getElementById("motionCanvas");
const ctx = canvas.getContext("2d");

function drawAxes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(200, 0); // Y-axis
  ctx.lineTo(200, 400);
  ctx.moveTo(0, 200); // X-axis
  ctx.lineTo(400, 200);
  ctx.moveTo(200, 200); // Z-axis (simulated in 2D)
  ctx.lineTo(400, 0);
  ctx.stroke();
  ctx.fillText("X", 390, 190);
  ctx.fillText("Y", 210, 10);
  ctx.fillText("Z", 390, 10);
}

function drawAcceleration(acceleration) {
  ctx.beginPath();
  ctx.arc(
    200 + acceleration.x * 10,
    200 - acceleration.y * 10,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.fillText(
    `Acc (x,y): (${acceleration.x.toFixed(2)}, ${acceleration.y.toFixed(2)})`,
    10,
    20
  );
}

function drawRotationRate(rotationRate) {
  ctx.fillText(
    `Rot Rate (α, β, γ): (${rotationRate.alpha?.toFixed(
      2
    )}, ${rotationRate.beta?.toFixed(2)}, ${rotationRate.gamma?.toFixed(2)})`,
    10,
    40
  );
}

function handleMotionEvent(event) {
  const acceleration = event.accelerationIncludingGravity;
  const rotationRate = event.rotationRate;

  drawAxes();
  drawAcceleration(acceleration);
  drawRotationRate(rotationRate);

  const dataDiv = document.getElementById("data");
  dataDiv.innerHTML = `
      <p>Acceleration (including gravity):</p>
      <p>X: ${acceleration.x?.toFixed(2)}, Y: ${acceleration.y?.toFixed(
    2
  )}, Z: ${acceleration.z?.toFixed(2)}</p>
      <p>Rotation Rate:</p>
      <p>Alpha: ${rotationRate.alpha?.toFixed(
        2
      )}, Beta: ${rotationRate.beta?.toFixed(
    2
  )}, Gamma: ${rotationRate.gamma?.toFixed(2)}</p>
    `;
}

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

drawAxes(); // Initial draw

// Request permission and initialize motion event on user interaction (e.g., button click)
document
  .getElementById("acceletometer-button")
  .addEventListener("click", initMotionEvent);
