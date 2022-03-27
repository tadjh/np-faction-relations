import { RelationalFaction } from '../../classes';
import { BSK, CG, JUSTUS as J, MAYHEM, SS } from './init';

const JUSTUS = new RelationalFaction(J);

JUSTUS.allies = [SS, BSK];
JUSTUS.friends = [CG];
JUSTUS.enemies = [MAYHEM];
export { JUSTUS };
