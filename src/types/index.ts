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
  | 'affiliates'
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

export type Website = 'wiki' | 'subreddit' | 'discord';

export type Websites = {
  [key in Website]: string;
};

export interface Faction {
  active: boolean;
  attributes: AttributeData;
  displayName: string;
  name: string;
  order: number;
  urls: Websites;
  relationships: Relationships;
  visibility: 'public' | 'private';
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

export interface Snapshot {
  factions: Factions;
  lastUpdate: Timestamp;
  created: FieldValue;
}
