import { createContext } from 'react';
import { HydratedFactionProps } from '../types';

export interface FactionsContextType {
  factions: HydratedFactionProps[] | null;
  length?: number;
}

let FactionsContext = createContext<FactionsContextType>(null!);

export default FactionsContext;
