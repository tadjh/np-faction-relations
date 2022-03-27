import { RelationalFaction } from '../../classes';
import { ANGELS, BCG, CG, HOA, HYDRA as H, LOST, OLGA, ST } from './init';

const HYDRA = new RelationalFaction(H);

HYDRA.associates = [CG, ST, BCG];
HYDRA.allies = [ANGELS, LOST, OLGA];
HYDRA.coldWar = [HOA];

export { HYDRA };
