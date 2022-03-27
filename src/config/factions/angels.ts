import { RelationalFaction } from '../../classes';
import { ANGELS as A, CG, HOA, HYDRA, MDM, OLGA } from './init';

const ANGELS = new RelationalFaction(A);
ANGELS.allies = [HYDRA, CG, MDM, OLGA];
ANGELS.enemies = [HOA];

export { ANGELS };
