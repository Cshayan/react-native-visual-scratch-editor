import bat from './assets/images/bat.png';
import man from './assets/images/man.png';
import plus from './assets/images/plus.png';

export const INITIAL_COORDINATES = {
  x: 100,
  y: 200,
};

export interface ISpritItem {
  id: number;
  name: string;
  source: number;
  show: boolean;
  default: number;
}

export const SPRITS_LIST: ISpritItem[] = [
  {
    id: 0,
    name: 'bat',
    source: bat,
    show: true,
    default: plus,
  },
  {
    id: 1,
    name: 'man',
    source: man,
    show: false,
    default: plus,
  },
];

export interface IAction {
  id: number;
  title: string;
}

export const ACTION_LIST: IAction[] = [
  {
    id: 0,
    title: 'Move X by 50',
  },
  {
    id: 1,
    title: 'Move Y by 50',
  },
  {
    id: 2,
    title: 'Rotate 360',
  },
  {
    id: 3,
    title: 'Go to (0, 0)',
  },
  {
    id: 4,
    title: 'Move X = 50, Y = 50',
  },
  {
    id: 5,
    title: 'Go to random position',
  },
  {
    id: 6,
    title: 'Say Hello',
  },
  {
    id: 7,
    title: 'Say Hello for 1 sec',
  },
  {
    id: 8,
    title: 'Increase size',
  },
  {
    id: 9,
    title: 'Decrease size',
  },
  {
    id: 10,
    title: 'Repeat',
  },
];
