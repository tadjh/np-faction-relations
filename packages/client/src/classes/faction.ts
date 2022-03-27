import { v4 as uuidv4 } from 'uuid';

interface args {
  nickname?: string;
  active?: boolean;
  hasBench?: boolean;
  benchCount?: number;
}

export class Faction {
  readonly id: string;
  readonly name: string;
  readonly nickname: string | null;
  readonly active: boolean;
  readonly hasBench: boolean;
  readonly benchCount: number;

  constructor(name: string, args?: args) {
    this.id = uuidv4();
    this.name = name;
    this.nickname = args && args.nickname ? args.nickname : null;
    this.active = args && args.active ? args.active : true;
    this.hasBench = args && args.hasBench ? args.hasBench : false;
    this.benchCount = args && args.benchCount ? args.benchCount : 1;
  }
}
