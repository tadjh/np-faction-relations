import { query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { ReactNode, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FACTION_COLLECTION_REFERENCE } from '../../config/firebase';
import FactionsContext from '../../contexts/factions.context';
import { AssociativeFactionProps, TimestampedFactionProps } from '../../types';

function FactionsProvider({ children }: { children: ReactNode }) {
  const [factions, setFactions] = useState<AssociativeFactionProps | null>(
    null
  );
  const [updated, setUpdated] = useState(0);
  useEffect(() => {
    const q = query<TimestampedFactionProps>(
      FACTION_COLLECTION_REFERENCE,
      where('visibility', '==', 'public'),
      orderBy('order')
    );

    const unsubscribe = onSnapshot<TimestampedFactionProps>(
      q,
      (querySnapshot) => {
        let newFactions: AssociativeFactionProps;
        let time = 0;
        querySnapshot.forEach((doc) => {
          newFactions = { ...newFactions, [doc.id]: doc.data() };
          doc.data().updated &&
            (time =
              doc.data().updated.seconds > time
                ? doc.data().updated.seconds
                : time);
        });

        // TODO Remove for React 18
        unstable_batchedUpdates(() => {
          setFactions(newFactions);
          setUpdated(time * 1000);
        });
      },
      (error) => {
        throw error;
      }
    );

    return () => unsubscribe();
  }, []);

  let value = {
    factions,
    length: factions ? Object.keys(factions).length : 0,
    updated,
  };

  return (
    <FactionsContext.Provider value={value}>
      {children}
    </FactionsContext.Provider>
  );
}

export default FactionsProvider;
