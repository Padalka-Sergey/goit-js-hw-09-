// const refs = {
//   startBtn: document.querySelector('[data-start]'),
//   stopBtn: document.querySelector('[data-stop]'),
//   body: document.querySelector('body'),
// };

let getEl = selector => document.querySelector(selector);

let startId = null;
const DELAY = 1000;
let startBtnActive = false;

// refs.startBtn.addEventListener('click', onStartInterval);
getEl('[data-start]').addEventListener('click', onStartInterval);
// console.dir(getEl('[data-start]'));

function onStartInterval() {
  if (startBtnActive) {
    return;
  }
  getEl('[data-start]').disabled = true;
  getEl('[data-stop]').disabled = false;

  startId = setInterval(() => {
    console.log('START');
    startBtnActive = true;
    // refs.body.style.backgroundColor = getRandomHexColor();
    getEl('body').style.backgroundColor = getRandomHexColor();
  }, DELAY);
}

// refs.stopBtn.addEventListener('click', onStopBtn);
getEl('[data-stop]').addEventListener('click', onStopBtn);

function onStopBtn() {
  console.log('Нажал на stop');
  clearInterval(startId);
  getEl('[data-stop]').disabled = true;
  getEl('[data-start]').disabled = false;
  startBtnActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
