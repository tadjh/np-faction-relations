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
  const [factions, setFactions] = useState<HydratedFactionProps[] | null>(null);
  const [updated, setUpdated] = useState(0);

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
        // const updatedDate = [...factionsArray].sort((a, b) => {
        //   const c: any = a.updated;
        //   const d: any = b.updated;
        //   return c.seconds - d.seconds;
        // });
        // const mostRecent: any = updatedDate[0].updated;

        setFactions(factionsArray);

        // console.log('sorted', updatedDate);

        // console.log('seconds', mostRecent.seconds);

        // setUpdated(mostRecent.seconds);
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
    updated: 0,
  };

  return (
    <FactionsContext.Provider value={value}>
      {children}
    </FactionsContext.Provider>
  );
}

export default FactionsProvider;
