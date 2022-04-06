import { createContext } from 'react';
import { AssociativeFactionProps } from '../types';

export interface FactionsContextType {
  factions: AssociativeFactionProps | null;
  length: number;
  updated: number;
}

let FactionsContext = createContext<FactionsContextType>(null!);

export default FactionsContext;
