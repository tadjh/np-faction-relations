import { RelationalFaction } from '../../classes';
import {
  HOA as H,
  CG,
  PD,
  HYDRA,
  ANGELS,
  GSF,
  LOST,
  MORTELLE,
  BALLAS,
  NERDS,
  MG,
  SSMC,
  ST,
  NBC,
  ESV,
  OLGA,
} from './init';

const HOA = new RelationalFaction(H);

HOA.allies = [CG, GSF, LOST, MORTELLE, MG, SSMC, NERDS, ESV, OLGA];
HOA.friends = [PD, BALLAS, ST, NBC];
HOA.coldWar = [HYDRA];
HOA.enemies = [ANGELS];

export { HOA };
