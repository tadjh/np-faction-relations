import { Faction } from './faction';

export class RelationalFaction {
  readonly id: string;
  readonly name: string;
  readonly nickname: string | null;
  readonly active: boolean;
  readonly hasBench: boolean;
  readonly benchCount: number;
  associates: Faction[];
  allies: Faction[];
  friends: Faction[];
  hotWar: Faction[];
  coldWar: Faction[];
  enemies: Faction[];

  constructor(gang: Faction) {
    this.id = gang.id;
    this.name = gang.name;
    this.nickname = gang.nickname || null;
    this.active = gang.active;
    this.hasBench = gang.hasBench;
    this.benchCount = gang.benchCount;
    this.associates = [];
    this.allies = [];
    this.friends = [];
    this.hotWar = [];
    this.coldWar = [];
    this.enemies = [];
  }
}
