import { RelationalFaction } from '../../classes';
import { AZTECAS as A, SS } from './init';

const AZTECAS = new RelationalFaction(A);

AZTECAS.allies = [SS];

export { AZTECAS };
