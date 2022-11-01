let getEl = selector => document.querySelector(selector);

getEl('.form').addEventListener('submit', createPromiseS);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function createPromiseS(evt) {
  evt.preventDefault();
  const amount = Number(getEl('[name="amount"]').value);
  let delayFirst = Number(getEl('[name="delay"]').value);
  let delay = Number(getEl('[name="step"]').value);

  delay = delayFirst;
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += Number(getEl('[name="step"]').value);
  }
}
