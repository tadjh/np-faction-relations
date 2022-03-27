import { RelationalFaction } from '../../classes';
import { BALLAS, BCG, CG, GSF, HOA, HYDRA, ST as S } from './init';

const ST = new RelationalFaction(S);

ST.associates = [CG, HYDRA, BCG];
ST.allies = [GSF];
ST.friends = [HOA];
ST.hotWar = [BALLAS];

export { ST };
