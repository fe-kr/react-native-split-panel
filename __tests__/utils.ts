import { fireEvent } from '@testing-library/react-native';

export const getRandomInteger = (min: number = 0, max: number = 100) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomColor = () =>
  `rgb(${[getRandomInteger(0, 256), getRandomInteger(0, 256), getRandomInteger(0, 256)]})`;

export const getRandomRectangle = () => ({
  x: getRandomInteger(),
  y: getRandomInteger(),
  width: getRandomInteger(),
  height: getRandomInteger(),
});

type FireNativeEvent = typeof fireEvent;

const fireNativeEvent = (...args: Parameters<FireNativeEvent>) => {
  const [element, eventName, nativeEvent] = args;

  fireEvent(element, eventName, { nativeEvent });
};

export * from '@testing-library/react-native';

export { fireNativeEvent as fireEvent };
