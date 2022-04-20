export * from './onecall';

export const setTimeoutAsync = (val, delay) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(val);
    }, delay);
  });
