import { RelationalFaction } from '../../classes';
import { BALLAS, BCG as B, CG, HYDRA, ST } from './init';

const BCG = new RelationalFaction(B);

BCG.associates = [CG, HYDRA, ST];
BCG.hotWar = [BALLAS];

export { BCG };
