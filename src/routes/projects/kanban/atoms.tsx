import { atom } from 'recoil';

export const workflowState = atom({
  key: 'workflow',
  default: ['a', 'b', 'c', 'd', 'e', 'f'],
});
