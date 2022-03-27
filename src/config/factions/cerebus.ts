import { RelationalFaction } from '../../classes';
import { CB, CEREBUS as C, CG, ESV } from './init';

const CEREBUS = new RelationalFaction(C);

CEREBUS.allies = [CB, ESV];
CEREBUS.enemies = [CG];

export { CEREBUS };
