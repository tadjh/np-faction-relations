import { RelationalFaction } from '../../classes';
import {
  AZTECAS,
  BALLAS,
  BBMC,
  BSK,
  ESV,
  GG,
  GSF,
  JUSTUS,
  LOST,
  SS as S,
} from './init';

const SS = new RelationalFaction(S);

SS.allies = [BBMC, BALLAS, LOST, GG, AZTECAS, GSF, JUSTUS];
SS.enemies = [ESV, BSK];
export { SS };
