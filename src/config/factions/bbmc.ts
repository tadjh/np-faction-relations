import { RelationalFaction } from '../../classes';
import { BBMC as B, GG, PD, SS } from './init';

const BBMC = new RelationalFaction(B);

BBMC.allies = [SS, GG];
BBMC.enemies = [PD];

export { BBMC };
