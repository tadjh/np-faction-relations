import { query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { ReactNode, useEffect, useState } from 'react';
import { FACTION_COLLECTION_REFERENCE } from '../../config/firebase';
import FactionsContext from '../../contexts/factions.context';
import { HydratedFactionProps, TimestampedFactionProps } from '../../types';

function FactionsProvider({ children }: { children: ReactNode }) {
  const [factions, setFactions] = useState<HydratedFactionProps[] | null>(null);
  const [updated, setUpdated] = useState('');
  useEffect(() => {
    const q = query<TimestampedFactionProps>(
      FACTION_COLLECTION_REFERENCE,
      where('active', '==', true),
      orderBy('order')
    );

    const unsubscribe = onSnapshot<TimestampedFactionProps>(
      q,
      (querySnapshot) => {
        let factionsArray: HydratedFactionProps[] = [];
        let time = 0;
        querySnapshot.forEach((doc) => {
          factionsArray = [...factionsArray, { ...doc.data(), id: doc.id }];
          time =
            doc.data().updated.seconds > time
              ? doc.data().updated.seconds
              : time;
        });

        setFactions(factionsArray);
        setUpdated(new Date(time * 1000).toString());
      },
      (error) => {
        throw error;
      }
    );

    return () => unsubscribe();
  }, []);

  let value = {
    factions,
    length: factions?.length,
    updated,
  };

  return (
    <FactionsContext.Provider value={value}>
      {children}
    </FactionsContext.Provider>
  );
}

export default FactionsProvider;
