import {REM_SIZE, SCALE_FACTOR_H, SCALE_FACTOR_W} from '@configs/themes/var';

export const rem = r => {
  return r * REM_SIZE;
};

export const scale = s => {
  return s * SCALE_FACTOR_W;
};

export const scaleH = s => {
  return s * SCALE_FACTOR_H;
};

export const remScale = r => {
  return scale(rem(r));
};

export const remScaleH = r => {
  // console.log('remScaleH', r, scaleH(rem(r)));
  return scaleH(rem(r));
};
