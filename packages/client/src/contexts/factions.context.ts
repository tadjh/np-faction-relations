import { createContext } from 'react';
import { HydratedFactionProps } from '../types';

export interface FactionsContextType {
  factions: HydratedFactionProps[] | null;
  length?: number;
  updated: number;
}

let FactionsContext = createContext<FactionsContextType>(null!);

export default FactionsContext;
