import { RelationalFaction } from '../../classes';
import { HOA, JUSTUS, MAYHEM as M, NBC } from './init';

const MAYHEM = new RelationalFaction(M);

MAYHEM.coldWar = [HOA];
MAYHEM.enemies = [NBC, JUSTUS];

export { MAYHEM };
