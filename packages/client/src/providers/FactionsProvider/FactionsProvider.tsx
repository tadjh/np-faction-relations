import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { ReactNode, useEffect, useState } from 'react';
import { COLLECTION_FACTIONS, db } from '../../config/firebase';
import FactionsContext from '../../contexts/factions.context';
import { HydratedFactionProps } from '../../types';

function FactionsProvider({ children }: { children: ReactNode }) {
  let [factions, setFactions] = useState<HydratedFactionProps[] | null>(null);

  useEffect(() => {
    const q = query<HydratedFactionProps>(
      collection(
        db,
        COLLECTION_FACTIONS
      ) as CollectionReference<HydratedFactionProps>,
      where('active', '==', true),
      orderBy('order')
    );

    const unsubscribe = onSnapshot<HydratedFactionProps>(
      q,
      (querySnapshot) => {
        let factionsArray: HydratedFactionProps[] = [];
        querySnapshot.forEach((doc) => {
          factionsArray = [...factionsArray, { ...doc.data(), id: doc.id }];
        });
        setFactions(factionsArray);
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
  };
  return (
    <FactionsContext.Provider value={value}>
      {children}
    </FactionsContext.Provider>
  );
}

export default FactionsProvider;
