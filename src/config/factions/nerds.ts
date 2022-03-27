import { RelationalFaction } from '../../classes';
import { CB, ESV, GG, NERDS as N, HOA, RUST } from './init';

const NERDS = new RelationalFaction(N);

NERDS.associates = [CB, GG, RUST];
NERDS.allies = [HOA, ESV];
export { NERDS };
