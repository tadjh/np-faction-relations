import { RelationalFaction } from '../../classes';
import { BALLAS, BSK, GSF as G, HOA, SS, ST } from './init';

const GSF = new RelationalFaction(G);

GSF.allies = [HOA, ST, SS];
GSF.hotWar = [BSK];
GSF.enemies = [BALLAS];

export { GSF };
