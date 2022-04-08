import { FieldValue, Timestamp } from 'firebase/firestore';

export type Role = 'subscriber' | 'editor' | 'admin';

export type Roles = {
  [key in Role]: boolean;
};

export interface User {
  uid: string;
  displayName: string | null;
  roles: Roles;
}

export type Relationship =
  | 'allies'
  | 'associates'
  | 'coldWars'
  | 'enemies'
  | 'friends'
  | 'hotWars';

export type RelationshipData = {
  [key in Relationship]: string[];
};

export type RelationshipDataType = { [x: string]: string[] };

export type AttributeData = {
  benchCount: number;
  hasBench: boolean;
  hasLab: boolean;
  labCount: number;
};

export interface FactionProps {
  visibility: 'public' | 'private';
  attributes: AttributeData;
  displayName: string;
  name: string;
  order: number;
  relationships: RelationshipData;
}

export interface TimestampedFactionProps extends FactionProps {
  created: Timestamp;
  updated: Timestamp | null;
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
