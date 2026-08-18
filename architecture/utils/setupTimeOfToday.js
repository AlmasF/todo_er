export function setupTimeOfToday() {
  const timeTag = document.getElementsByTagName("time")?.[0];
  const now = new Date();
  const format = now.toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  timeTag.innerText = format;
  timeTag.dateTime = now.toISOString();
}
