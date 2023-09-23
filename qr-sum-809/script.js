document.addEventListener('DOMContentLoaded', () => {
  const countdownElement = document.getElementById('countdown');

  let seconds = 3;
  const countdownInterval = setInterval(() => {
    countdownElement.innerText = seconds;
    if (seconds === 0) {
      clearInterval(countdownInterval);
      window.location.href = 'https://www.bing.com';
    }
    seconds--;
  }, 1000);
});