import { FieldValue } from 'firebase/firestore';

export interface FactionProps {
  active: boolean;
  attributes: {
    benchCount: number;
    hasBench: boolean;
    hasLab: boolean;
    labCount: number;
  };
  displayName: string;
  name: string;
  order: number;
  relationships: {
    allies: { type: 'allies'; data: string[] };
    associates: { type: 'associates'; data: string[] };
    coldWar: { type: 'coldWar'; data: string[] };
    enemies: { type: 'enemies'; data: string[] };
    friends: { type: 'friends'; data: string[] };
    hotWar: { type: 'hotWar'; data: string[] };
  };
}

export interface TimestampedFactionProps extends FactionProps {
  created?: FieldValue;
  updated?: FieldValue;
}

export interface HydratedFactionProps extends TimestampedFactionProps {
  id: string;
}
