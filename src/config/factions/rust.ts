import { RelationalFaction } from '../../classes';
import { CB, ESV, GG, NERDS, RUST as R } from './init';

const RUST = new RelationalFaction(R);

RUST.associates = [CB, GG, NERDS];
RUST.allies = [ESV];
export { RUST };
