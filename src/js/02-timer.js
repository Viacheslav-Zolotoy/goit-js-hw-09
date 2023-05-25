import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates, dateStr) {
        console.log(selectedDates[0], dateStr);
    },
};
const calendar = flatpickr('#datetime-picker', options);
const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

function startTimer() {
    const selectDate = Date.parse(calendar.selectedDates);
    if (selectDate < Date.now()) {
        Notify.warning("Please choose a date in the future");
        return;
    }
    btnStartEl.setAttribute('disabled', true);
    inputEl.setAttribute('disabled', true);
    const timerId = setInterval(() => {
        const deltaTime = selectDate - Date.now();
        if (deltaTime <= 0) {
            clearInterval(timerId);
            return;
        };
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        console.log(`${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`);
        daysEl.textContent = `${addLeadingZero(days)}`;
        hoursEl.textContent = `${addLeadingZero(hours)}`;
        minutesEl.textContent = `${addLeadingZero(minutes)}`;
        secondsEl.textContent = `${addLeadingZero(seconds)}`;
    }, 1000);
};
function initTimer(event) {
    startTimer();
};
function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
btnStartEl.addEventListener('click', initTimer);



