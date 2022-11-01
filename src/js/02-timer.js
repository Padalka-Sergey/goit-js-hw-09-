// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

let getEl = selector => document.querySelector(selector);
let startId = null;
const DELAY = 1000;
let startBtn = false;

getEl('[data-start]').classList.add('no-active');
getEl('[data-start]').addEventListener('click', onStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // onOpen() {
  //   getEl('[data-start]').classList.add('no-active');
  // },
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      window.alert('Please choose a date in the future');
      return;
    }

    getEl('[data-start]').classList.remove('no-active');
  },
};

const calendar = flatpickr('#datetime-picker', options);

function onStartTimer() {
  if (startBtn || getEl('[data-start]').classList.contains('no-active')) {
    return;
  }
  const selecttime = calendar.selectedDates[0].getTime();
  if (selecttime > Date.now()) {
    startId = setInterval(() => {
      startBtn = true;
      if (selecttime <= Date.now() + 1000) {
        clearInterval(startId);
      }
      let difTime = selecttime - Date.now();
      const time = convertMs(difTime);
      updateClockface(time);
    }, DELAY);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  getEl('[data-days]').textContent = `${days}`;
  getEl('[data-hours]').textContent = `${hours}`;
  getEl('[data-minutes]').textContent = `${minutes}`;
  getEl('[data-seconds]').textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
