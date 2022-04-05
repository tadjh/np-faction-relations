import { RelationalFaction } from '../../classes';
import { ANGELS, CB, HOA, HYDRA, MG, OLGA as O } from './init';

const OLGA = new RelationalFaction(O);

OLGA.allies = [ANGELS, HOA, HYDRA, CB];
OLGA.enemies = [MG];

export { OLGA };
