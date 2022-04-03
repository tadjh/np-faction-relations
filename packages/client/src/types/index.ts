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
    allies: string[];
    associates: string[];
    coldWar: string[];
    enemies: string[];
    friends: string[];
    hotWar: string[];
  };
}

export interface TimestampedFactionProps extends FactionProps {
  created: FieldValue | null;
  updated: FieldValue | null;
}

export interface HydratedFactionProps extends TimestampedFactionProps {
  id: string;
}
