import { RelationalFaction } from '../../classes';
import { HOA, SSMC as S } from './init';

const SSMC = new RelationalFaction(S);

SSMC.allies = [HOA];

export { SSMC };
