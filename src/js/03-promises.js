import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const delayInputEl = formEl.querySelector('input[name="delay"]');
const stepInputEl = formEl.querySelector('input[name="step"]');
const amountInputEl = formEl.querySelector('input[name="amount"]');

const initCreatePromise = event => {
  event.preventDefault();
  let delay = parseInt(delayInputEl.value);
  const step = parseInt(stepInputEl.value);
  const amount = parseInt(amountInputEl.value);
  for (let i = 1; i <= amount; i += 1) {
    const currentDelay = delay + (i - 1) * step;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  };
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};
formEl.addEventListener('submit', initCreatePromise);
