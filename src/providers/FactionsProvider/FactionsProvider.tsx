import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { COLLECTION_FACTIONS } from '../../config/environment';
import FactionsContext, {
  FactionsContextType,
} from '../../contexts/factions.context';
import { useApi } from '../../hooks';
import { getErrorMessage } from '../../utils';

function FactionsProvider({ children }: { children: ReactNode }) {
  const { getFactions } = useApi();
  const { data } = useQuery(COLLECTION_FACTIONS, getFactions, {
    onError: (error) =>
      toast.error('Error getting factions: ' + getErrorMessage(error)),
  });

  const value: FactionsContextType = {
    factions: data?.factions || null,
    length: data?.length || 0,
    lastUpdate: data?.lastUpdate || 0,
  };

  return (
    <FactionsContext.Provider value={value}>
      {children}
    </FactionsContext.Provider>
  );
}

export default FactionsProvider;
