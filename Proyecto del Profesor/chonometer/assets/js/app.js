let time = 0;
let interval = null;
let status = 'arrested'; //  status: 'arrested', 'running', 'slow'

function updateDisplay() {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  // Ensure they always have 2 digits (e.g., 05 instead of 5)
  let hoursStr = hours.toString().padStart(2, '0');
  let minutesStr = minutes.toString().padStart(2, '0');
  let secondsStr = seconds.toString().padStart(2, '0');

  document.getElementById('chonometer-display').innerText = `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function btnStart() {
  if (status !== 'running') {
    status = 'running';
// setInterval executes the function every 1000ms (1 second)
    interval = setInterval(() => {
      time++;
      updateDisplay();
    }, 1000);
  }
  showStatus();
}

function btnPause() {
  if (status === 'running') {
    clearInterval(interval);
    status = 'slow';
    showStatus();
  }
}

function btnStop() {
  clearInterval(interval);
  status = 'arrested';
  showStatus();
}

function btnReset() {
  btnStop();
  time = 0;
  updateDisplay();
  status = 'reset';
  showStatus();
}
function showStatus() {
  console.log("Current status...: " + status);
}




