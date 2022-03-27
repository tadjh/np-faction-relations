import { RelationalFaction } from '../../classes';
import { BALLAS as B, BCG, ESV, GSF, HOA, SS, ST } from './init';

const BALLAS = new RelationalFaction(B);

BALLAS.allies = [SS];
BALLAS.friends = [HOA];
BALLAS.hotWar = [ST, BCG];
BALLAS.enemies = [GSF, ESV];

export { BALLAS };
