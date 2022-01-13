import {Dimensions} from 'react-native';
import {format, isValid} from 'date-fns';

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const asyncForEach = async (array, callback) => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

export const parseErrorMessage = error => {
  console.log('parseErrorMessage', error);
  console.log('parseErrorMessage message', error.message);
  console.log('parseErrorMessage response', error.response);

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error.message === 'object') {
    if (typeof error.message.data === 'string') {
      return error.message.data;
    }
    if (typeof error.message.data === 'object') {
      console.log(error.message.data);
      return 'Data object error';
    }

    return error.message.text;
  }
  if (error.response && error.response.data) {
    const {data} = error.response;
    if (typeof data === 'string') {
      return data;
    }
  }

  return error.message;
};

export const mergeStyles = (styles, ...otherStyles) => {
  const normalizeStyles = otherStyles.reduce((p, c) => {
    if (c) {
      if (Array.isArray(c)) {
        p = p.concat(c);
      } else {
        p.push(c);
      }
    }
    return p;
  }, []);

  if (Array.isArray(styles)) {
    styles.push(...normalizeStyles);
    return styles;
    // return [...styles, ...normalizeStyles];
  }

  return [styles, ...normalizeStyles];
};

export const windowWidth = Dimensions.get('window').width;

export const windowHeight = Dimensions.get('window').height;

export const toFullDate = date => format(date, 'PP p');
export const toShortDate = date => format(date, 'P');
export const toTime = date => format(date, 'p');
export const isDate = date => isValid(date);
export const toLongDate = date => format(date, 'PP');
