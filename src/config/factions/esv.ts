import { RelationalFaction } from '../../classes';
import {
  BALLAS,
  CB,
  CEREBUS,
  ESV as E,
  GG,
  NERDS,
  HOA,
  LOST,
  MG,
  MORTELLE,
  PD,
  RUST,
  SS,
} from './init';

const ESV = new RelationalFaction(E);

ESV.allies = [CB, LOST, CEREBUS, GG, NERDS, RUST, HOA, MORTELLE];
ESV.friends = [MORTELLE];
ESV.enemies = [SS, BALLAS, PD, MG];
export { ESV };
