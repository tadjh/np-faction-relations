import { FieldValue, Timestamp } from 'firebase/firestore';

export type Relationship =
  | 'allies'
  | 'associates'
  | 'coldWar'
  | 'enemies'
  | 'friends'
  | 'hotWar';

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
    [key in Relationship]: {
      type: Relationship;
      data: string[];
    };
  };
}

export interface TimestampedFactionProps extends FactionProps {
  created: Timestamp;
  updated: Timestamp;
}

export interface ServerTimeFactionProps extends FactionProps {
  created: FieldValue;
  updated: FieldValue;
}

export interface AssociativeFactionProps {
  [id: string]: TimestampedFactionProps;
}

export interface ServerAssociativeFactionProps {
  [id: string]: ServerTimeFactionProps;
}
