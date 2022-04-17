import { useContext } from 'react';
import {
  LABEL_TEXT_ASSOCIATES,
  LABEL_TEXT_ALLIES,
  LABEL_TEXT_FRIENDS,
  LABEL_TEXT_COLD_WARS,
  LABEL_TEXT_HOT_WARS,
  LABEL_TEXT_ENEMIES,
} from '../config/strings';
import FactionsContext from '../contexts/factions.context';
import { Factions, Relationship, TimestampedFaction } from '../types';
import { isEmptyString } from '../utils';

export function getFaction(factions: Factions, factionId: string) {
  return factions[factionId];
}

export function getName(faction: TimestampedFaction) {
  return faction.name;
}

export function getDisplayName(faction: TimestampedFaction) {
  return faction.displayName;
}

export function getActive(faction: TimestampedFaction) {
  return faction.active;
}

export function getHasBench(faction: TimestampedFaction) {
  return faction.attributes.hasBench;
}

export function getBenchCount(faction: TimestampedFaction) {
  return faction.attributes.benchCount;
}

export function getHasLab(faction: TimestampedFaction) {
  return faction.attributes.hasLab;
}

export function getLabCount(faction: TimestampedFaction) {
  return faction.attributes.labCount;
}

export function getAllies(faction: TimestampedFaction) {
  return faction.relationships.allies;
}

export function getAssociates(faction: TimestampedFaction) {
  return faction.relationships.associates;
}

export function getColdWars(faction: TimestampedFaction) {
  return faction.relationships.coldWars;
}

export function getEnemies(faction: TimestampedFaction) {
  return faction.relationships.enemies;
}

export function getFriends(faction: TimestampedFaction) {
  return faction.relationships.friends;
}

export function getHotWars(faction: TimestampedFaction) {
  return faction.relationships.hotWars;
}

export function getRelationship(
  faction: TimestampedFaction,
  type: Relationship
) {
  switch (type) {
    case 'allies':
      return getAllies(faction);
    case 'associates':
      return getAssociates(faction);
    case 'coldWars':
      return getColdWars(faction);
    case 'enemies':
      return getEnemies(faction);
    case 'friends':
      return getFriends(faction);
    case 'hotWars':
      return getHotWars(faction);
    default:
      throw new Error('Invalid Relationship type in getRelationship');
  }
}

export function getLabelText(type: Relationship) {
  switch (type) {
    case 'allies':
      return LABEL_TEXT_ALLIES;
    case 'associates':
      return LABEL_TEXT_ASSOCIATES;
    case 'coldWars':
      return LABEL_TEXT_COLD_WARS;
    case 'enemies':
      return LABEL_TEXT_ENEMIES;
    case 'friends':
      return LABEL_TEXT_FRIENDS;
    case 'hotWars':
      return LABEL_TEXT_HOT_WARS;
    default:
      throw new Error('Invalid Relationship type in getLabelText');
  }
}

export function getOrder(faction: TimestampedFaction) {
  return faction.order;
}

export function composeFullName(faction: TimestampedFaction) {
  const name = getName(faction);
  const displayName = getDisplayName(faction);
  if (isEmptyString(displayName)) return name;
  return `${name} [${displayName}]`;
}

export function composeShortName(faction: TimestampedFaction) {
  return getDisplayName(faction) || getName(faction);
}

export function shouldShow(factions: Factions | null, factionId: string) {
  if (!factions) return false;
  return getActive(factions[factionId]);
}

export function useFactions() {
  return useContext(FactionsContext);
}
