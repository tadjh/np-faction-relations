import { Faction } from '../../classes';

const ANGELS = new Faction('Angels');
const AZTECAS = new Faction('Aztecas');
const BALLAS = new Faction('Ballas');
const BBMC = new Faction('Bondi Boys MC', { nickname: 'BBMC' });
const BCF = new Faction('Balbani Crime Family', {
  nickname: 'BCF',
  active: false,
});
const BCG = new Faction('Bowl Cut Gang', { nickname: 'BCG' });
const BSK = new Faction('Brouge Street Kingz', { nickname: 'B$K' });
const CB = new Faction('Cleanbois', { nickname: 'CB' });
const CEREBUS = new Faction('Cerebus');
const CG = new Faction('Chang Gang', {
  nickname: 'CG',
  hasBench: true,
  benchCount: 2,
});
const ESV = new Faction('Vagos', { nickname: 'ESV', hasBench: true });
const GG = new Faction('Gulag Gang', { nickname: 'GG' });
const GSF = new Faction('The Families', { nickname: 'GSF' });
const NERDS = new Faction('The Guild', { nickname: 'Nerds', hasBench: true });
const HOA = new Faction('Hogs of Anarchy', { nickname: 'HOA', hasBench: true });
const HYDRA = new Faction('Hydra');
const JUSTUS = new Faction('JustUs');
const LOST = new Faction('Lost MC', { nickname: 'Lost', hasBench: true });
const MAYHEM = new Faction('Mayhem');
const MDM = new Faction('The Mandem', { nickname: 'MDM', hasBench: true });
const MG = new Faction('Marabunta Grande', { nickname: 'MG' });
const MORTELLE = new Faction('Mortelle');
const NBC = new Faction('Natural Born Crackheads', { nickname: 'NBC' });
const OLGA = new Faction("Olga's Class 1 Bench Crew", {
  nickname: 'Olga',
  hasBench: true,
});
const PD = new Faction('Police Department', { nickname: 'PD' });
const REDLINE = new Faction('Redline');
const RUST = new Faction("Ray's Unfortunate Scuff Team", {
  nickname: 'R.U.S.T',
});
const SS = new Faction('Seaside', { nickname: 'SS', hasBench: true });
const SSMC = new Faction('Sinister Souls MC', { nickname: 'SSMC' });
const ST = new Faction('Street Team', { nickname: 'ST' });
const YOKAI = new Faction('Yoaki');

export {
  ANGELS,
  AZTECAS,
  BALLAS,
  BBMC,
  BCF,
  BCG,
  BSK,
  CB,
  CEREBUS,
  CG,
  ESV,
  GG,
  HOA,
  HYDRA,
  JUSTUS,
  LOST,
  MG,
  MAYHEM,
  MORTELLE,
  NBC,
  OLGA,
  REDLINE,
  PD,
  RUST,
  SSMC,
  SS,
  ST,
  GSF,
  NERDS,
  MDM,
  YOKAI,
};
