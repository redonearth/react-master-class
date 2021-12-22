import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

export const isGradientAtom = atom({
  key: 'isGradient',
  default: false,
});
