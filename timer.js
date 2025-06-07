// Set the target end date: June 30, 2025, 12:00 PM (local time)
const targetDate = new Date('June 30, 2025 12:00:00');

function updateTimer() {
  const currentTime = new Date().getTime();
  const distance = targetDate - currentTime;

  const timerMessage = document.getElementById("timer-message");

  if (distance <= 0) {
    timerMessage.textContent = "Season Ended";
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timerMessage.textContent = 
    `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();
