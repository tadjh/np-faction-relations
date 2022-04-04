import { addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {
  factionDocumentReference,
  FACTION_COLLECTION_REFERENCE,
} from '../config/firebase';
import {
  FactionProps,
  HydratedFactionProps,
  ServerTimeFactionProps,
} from '../types';

export function useApi() {
  const createFaction = async (data: FactionProps) => {
    const newDoc: ServerTimeFactionProps = {
      ...data,
      created: serverTimestamp(),
      updated: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(FACTION_COLLECTION_REFERENCE, newDoc);
      console.log('Document written with ID: ', docRef.id);
      return docRef;
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  };

  const editFaction = async ({ id, ...data }: HydratedFactionProps) => {
    const nextDoc: ServerTimeFactionProps = {
      ...data,
      updated: serverTimestamp(),
    };

    try {
      const docRef = await updateDoc(factionDocumentReference(id), {
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
      await updateDoc(factionDocumentReference(id), {
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
