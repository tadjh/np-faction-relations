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

export type Relationships = {
  [key in Relationship]: string[];
};

export type RelationshipsType = { [x: string]: string[] };

export type AttributeData = {
  benchCount: number;
  hasBench: boolean;
  hasLab: boolean;
  labCount: number;
};

export interface Faction {
  visibility: 'public' | 'private';
  attributes: AttributeData;
  displayName: string;
  name: string;
  order: number;
  relationships: Relationships;
}

export interface TimestampedFaction extends Faction {
  created: Timestamp;
  updated: Timestamp | null;
}

export interface ServerTimestampedFaction extends Faction {
  created: FieldValue;
  updated: FieldValue;
}

export interface Factions {
  [id: string]: TimestampedFaction;
}

export interface ServerFactions {
  [id: string]: ServerTimestampedFaction;
}

export interface History {
  factions: Factions;
  created: FieldValue;
}
