import { Timestamp } from 'firebase/firestore';
import { createContext } from 'react';
import { Factions } from '../types';

export interface FactionsContextType {
  factions: Factions | null;
  length: number;
  lastUpdate: Timestamp;
}

let FactionsContext = createContext<FactionsContextType>(null!);

export default FactionsContext;
