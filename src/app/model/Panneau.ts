import { Boulevard } from './Boulevard';

export interface Panneau {
  id: number;
  taille: number;
  availability: boolean;
  boulevard: Boulevard;
}
