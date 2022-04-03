import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { COLLECTION_FACTIONS, db } from '../config/firebase';
import {
  FactionProps,
  HydratedFactionProps,
  TimestampedFactionProps,
} from '../types';

export function useApi() {
  const createFaction = async (data: FactionProps) => {
    const newDoc: TimestampedFactionProps = {
      ...data,
      created: serverTimestamp(),
      updated: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(collection(db, COLLECTION_FACTIONS), newDoc);
      console.log('Document written with ID: ', docRef.id);
      return docRef;
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  };

  const editFaction = async ({ id, ...data }: HydratedFactionProps) => {
    const nextDoc: TimestampedFactionProps = {
      ...data,
      updated: serverTimestamp(),
    };

    try {
      const docRef = await updateDoc(doc(db, COLLECTION_FACTIONS, id), {
        ...nextDoc,
      });
      console.log('Document edited with ID: ', id);
      return docRef;
    } catch (error) {
      console.error('Error editing document: ', error);
      throw error;
    }
  };

  const deleteFaction = async (id: string) => {
    const nextDoc = {
      active: false,
      updated: serverTimestamp(),
    };
    try {
      await updateDoc(doc(db, COLLECTION_FACTIONS, id), {
        ...nextDoc,
      });
      console.log('Document deleted with ID: ', id);
      return;
    } catch (error) {
      console.error('Error deleting document: ', error);
      throw error;
    }
  };
  return { createFaction, editFaction, deleteFaction };
}
