import { RelationalFaction } from '../../classes';
import { BSK as B, GSF, JUSTUS, LOST, NBC, SS } from './init';

const BSK = new RelationalFaction(B);

BSK.allies = [NBC, JUSTUS];
BSK.hotWar = [GSF];
BSK.enemies = [SS, LOST];
export { BSK };
