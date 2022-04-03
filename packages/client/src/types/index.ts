import { Timestamp } from 'firebase/firestore';

// TODO createdAt, updatedAt
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
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface HydratedFactionProps extends TimestampedFactionProps {
  id: string;
}
