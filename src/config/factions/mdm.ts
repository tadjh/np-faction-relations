import { RelationalFaction } from '../../classes';
import { ANGELS, CG, MDM as M, MORTELLE, NBC } from './init';

const MDM = new RelationalFaction(M);

MDM.allies = [NBC, ANGELS];
MDM.friends = [MORTELLE];
MDM.hotWar = [CG];

export { MDM };
