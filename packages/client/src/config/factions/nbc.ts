import { RelationalFaction } from '../../classes';
import { BSK, CG, HOA, MAYHEM, MDM, NBC as N } from './init';

const NBC = new RelationalFaction(N);

NBC.allies = [CG, MDM, BSK];
NBC.friends = [HOA];
NBC.enemies = [MAYHEM];

export { NBC };
