import { createContext } from 'react';
import { Factions } from '../types';

export interface FactionsContextType {
  factions: Factions | null;
  length: number;
  updated: number;
}

let FactionsContext = createContext<FactionsContextType>(null!);

export default FactionsContext;
