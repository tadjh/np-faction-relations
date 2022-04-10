import { createContext } from 'react';
import { Factions } from '../types';

export interface FactionsContextType {
  factions: Factions | null;
  length: number;
  lastUpdate: number;
}

let FactionsContext = createContext<FactionsContextType>(null!);

export default FactionsContext;
