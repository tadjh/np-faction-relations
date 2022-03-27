import { RelationalFaction } from '../../classes';
import { BBMC, CG, ESV, HOA, LOST, PD as P } from './init';

const PD = new RelationalFaction(P);

// .allies = []
PD.friends = [HOA];
// .coldWar = []
// .hotWar = []
PD.enemies = [CG, BBMC, LOST, ESV];

export { PD };
