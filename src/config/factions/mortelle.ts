import { RelationalFaction } from '../../classes';
import { ESV, HOA, MDM, MORTELLE as M } from './init';

const MORTELLE = new RelationalFaction(M);

MORTELLE.allies = [ESV, HOA];
MORTELLE.friends = [MDM];

export { MORTELLE };
