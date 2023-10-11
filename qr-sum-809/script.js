document.addEventListener('DOMContentLoaded', () => {
  const countdownElement = document.getElementById('countdown');

  let seconds = 3;
  const countdownInterval = setInterval(() => {
    countdownElement.innerText = seconds;
    if (seconds === 0) {
      clearInterval(countdownInterval);
      window.location.href = 'https://drive.google.com/file/d/1nCNJRi24mwqQIvAFAKUA8AB-tkxpgodz/view?usp=sharing';
    }
    seconds--;
  }, 1000);
});