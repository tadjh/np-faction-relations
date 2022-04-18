import { useContext } from 'react';
import {
  LABEL_TEXT_AFFILIATES,
  LABEL_TEXT_ALLIES,
  LABEL_TEXT_FRIENDS,
  LABEL_TEXT_COLD_WARS,
  LABEL_TEXT_HOT_WARS,
  LABEL_TEXT_ENEMIES,
} from '../config/strings';
import FactionsContext from '../contexts/factions.context';
import { Factions, Relationship, TimestampedFaction, Website } from '../types';
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

export function getAffiliates(faction: TimestampedFaction) {
  return faction.relationships.affiliates;
}

export function getAllies(faction: TimestampedFaction) {
  return faction.relationships.allies;
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

export function getNumOfAffiliates(faction: TimestampedFaction) {
  return getAffiliates(faction).length;
}

export function getNumOfAllies(faction: TimestampedFaction) {
  return getAllies(faction).length;
}

export function getNumOfColdWars(faction: TimestampedFaction) {
  return getColdWars(faction).length;
}

export function getNumOfEnemies(faction: TimestampedFaction) {
  return getEnemies(faction).length;
}

export function getNumOfFriends(faction: TimestampedFaction) {
  return getFriends(faction).length;
}

export function getNumOfHotWars(faction: TimestampedFaction) {
  return getHotWars(faction).length;
}

export function getWebsites(faction: TimestampedFaction) {
  return faction.urls;
}

export function getWebsite(faction: TimestampedFaction, website: Website) {
  return faction.urls[website];
}

export function getRelationship(
  faction: TimestampedFaction,
  type: Relationship
) {
  switch (type) {
    case 'allies':
      return getAllies(faction);
    case 'affiliates':
      return getAffiliates(faction);
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
    case 'affiliates':
      return LABEL_TEXT_AFFILIATES;
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

export function shouldShow(factions: Factions | null, factionId: string) {
  if (!factions) return false;
  return getActive(factions[factionId]);
}

export function composeFullName(faction: TimestampedFaction) {
  const name = getName(faction);
  const displayName = getDisplayName(faction);
  if (isEmptyString(displayName)) return name;
  return `${name} [${displayName}]`;
}

export function composeLabeledFullName(faction: TimestampedFaction) {
  return `name: ${composeFullName(faction)}`;
}

export function composeShortName(faction: TimestampedFaction) {
  return getDisplayName(faction) || getName(faction);
}

export function composeWebsiteLabel(website: string) {
  return `${website}: `;
}

export function useFactions() {
  return useContext(FactionsContext);
}
