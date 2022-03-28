import { Schema, Types, model } from 'mongoose';

export interface Faction {
  name: string;
  nickname: string;
  hasBench: boolean;
  benchCount: number;
  associates: Types.ObjectId[];
  allies: Types.ObjectId[];
  friends: Types.ObjectId[];
  hotWar: Types.ObjectId[];
  coldWar: Types.ObjectId[];
  enemies: Types.ObjectId[];
  active: boolean;
  order: number;
}

// export interface IFaction extends Document, Faction {}

const schema = new Schema({
  name: String,
  nickname: String,
  hasBench: Boolean,
  benchCount: Number,
  associates: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  allies: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  hotWar: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  coldWar: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  enemies: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  active: Boolean,
  order: Number,
});

export default model<Faction>('Faction', schema);
