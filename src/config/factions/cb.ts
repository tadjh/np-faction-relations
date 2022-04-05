import { RelationalFaction } from '../../classes';
import { CB as C, CEREBUS, CG, ESV, GG, NERDS, OLGA, RUST } from './init';

const CB = new RelationalFaction(C);

CB.associates = [RUST, GG, NERDS];
CB.allies = [CEREBUS, ESV, OLGA];
CB.coldWar = [CG];

export { CB };
