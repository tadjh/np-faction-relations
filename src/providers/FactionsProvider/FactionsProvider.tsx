import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { COLLECTION_FACTIONS } from '../../config/environment';
import FactionsContext, {
  FactionsContextType,
} from '../../contexts/factions.context';
import { useApi } from '../../hooks';

function FactionsProvider({ children }: { children: ReactNode }) {
  const { getFactions } = useApi();
  const { data } = useQuery(COLLECTION_FACTIONS, getFactions);

  const value: FactionsContextType = {
    factions: data?.factions || null,
    length: data?.length || 0,
    updated: data?.updated || 0,
  };

  return (
    <FactionsContext.Provider value={value}>
      {children}
    </FactionsContext.Provider>
  );
}

export default FactionsProvider;
