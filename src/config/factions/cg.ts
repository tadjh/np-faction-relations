import { RelationalFaction } from '../../classes';
import {
  CG as C,
  ST,
  HYDRA,
  HOA,
  ANGELS,
  JUSTUS,
  CB,
  MDM,
  CEREBUS,
  BCG,
  PD,
  NBC,
} from './init';

const CG = new RelationalFaction(C);

CG.associates = [ST, HYDRA, BCG];
CG.allies = [HOA, NBC, ANGELS];
CG.friends = [JUSTUS];
CG.coldWar = [CB];
CG.hotWar = [MDM];
CG.enemies = [CEREBUS, PD];

export { CG };
