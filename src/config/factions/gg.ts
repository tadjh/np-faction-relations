import { RelationalFaction } from '../../classes';
import { BBMC, CB, ESV, GG as G, NERDS, RUST, SS } from './init';

const GG = new RelationalFaction(G);

GG.associates = [CB, RUST, NERDS];
GG.allies = [ESV, BBMC, SS];

export { GG };
