import {REM_SIZE, SCALE_FACTOR} from '@configs/themes/var';

export const rem = r => {
  return r * REM_SIZE;
};

export const scale = s => {
  return s * SCALE_FACTOR;
};

export const remScale = r => {
  return scale(rem(r));
};
