import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { COLLECTION_FACTIONS, db } from '../config/firebase';
import { FactionProps, TimestampedFactionProps } from '../types';

export function useApi() {
  const createFaction = async (data: FactionProps) => {
    const newDoc: TimestampedFactionProps = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
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

  return { createFaction };
}
