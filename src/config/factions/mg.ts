import { RelationalFaction } from '../../classes';
import { ESV, HOA, MG as M, OLGA } from './init';

const MG = new RelationalFaction(M);

MG.allies = [HOA];
MG.enemies = [ESV, OLGA];

export { MG };
