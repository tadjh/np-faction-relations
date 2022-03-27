import { RelationalFaction } from '../../classes';
import { BSK, ESV, HOA, HYDRA, LOST as L, PD, SS } from './init';

const LOST = new RelationalFaction(L);

LOST.allies = [HOA, HYDRA, SS, ESV];
LOST.enemies = [BSK, PD];

export { LOST };
