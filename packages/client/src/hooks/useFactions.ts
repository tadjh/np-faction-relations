import { useContext } from 'react';
import FactionsContext from '../contexts/factions.context';

export function useFactions() {
  return useContext(FactionsContext);
}
