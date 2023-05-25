
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]')
const bodyEl = document.querySelector("body");
let intervalId = null;
const changeColorBody = event => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    intervalId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    buttonStartEl.setAttribute("disabled", true);
};
const stopChangeColor = event => {
    buttonStartEl.removeAttribute("disabled");
    clearInterval(intervalId);
};
buttonStartEl.addEventListener('click', changeColorBody);
buttonStopEl.addEventListener('click', stopChangeColor);
