export function startTimer() {
  document.addEventListener("DOMContentLoaded", () => {
    const clockElement = document.getElementById("clock");

    function updateClock() {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const time = `${hours}:${minutes}:${seconds}`;

      clockElement.innerHTML = time;

      requestAnimationFrame(updateClock);
    }

    requestAnimationFrame(updateClock);
  });
}
