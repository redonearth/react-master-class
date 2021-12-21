import { atom } from 'recoil';

export interface IWorkflow {
  id: number;
  text: string;
}

interface IWorkflowState {
  [key: string]: IWorkflow[];
}

export const workflowState = atom<IWorkflowState>({
  key: 'workflow',
  default: {
    'To Do': [],
    Doing: [],
    Done: [],
  },
});
