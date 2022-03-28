export interface FactionProps {
  name: string;
  nickname: string;
  active: boolean;
  hasBench: boolean;
  benchCount: number;
  associates: string[];
  allies: string[];
  friends: string[];
  hotWar: string[];
  coldWar: string[];
  enemies: string[];
  order: number;
}
