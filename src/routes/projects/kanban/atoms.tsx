import { atom } from 'recoil';

interface IWorkflowState {
  [key: string]: string[];
}

export const workflowState = atom<IWorkflowState>({
  key: 'workflow',
  default: {
    'To Do': ['a', 'b'],
    Doing: ['c', 'd', 'e'],
    Done: ['f'],
  },
});
