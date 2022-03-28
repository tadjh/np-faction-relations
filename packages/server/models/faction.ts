import { Schema, model, Document } from 'mongoose';

export interface FactionItem {
  name: string;
  nickname: string | null;
  active: boolean;
  hasBench: boolean;
  benchCount: boolean;
  position: number;
  associates: Schema.Types.ObjectId[];
  allies: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
  hotWar: Schema.Types.ObjectId[];
  coldWar: Schema.Types.ObjectId[];
  enemies: Schema.Types.ObjectId[];
}

export interface IFaction extends Document, FactionItem {}

const FactionSchema = new Schema({
  name: String,
  nickname: String || null,
  active: Boolean,
  hasBench: Boolean,
  benchCount: Number,
  position: Number,
  associates: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  allies: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  hotWar: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  coldWar: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
  enemies: [{ type: Schema.Types.ObjectId, ref: 'Faction' }],
});

export default model('Faction', FactionSchema);
