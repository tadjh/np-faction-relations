import {
  addDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { IS_DEVELOPMENT } from '../config/environment';
import {
  db,
  factionDocumentReference,
  FACTION_COLLECTION_QUERY,
  FACTION_COLLECTION_REFERENCE,
  SNAPSHOT_COLLECTION_REFERENCE,
} from '../config/firebase';
import { FactionsContextType } from '../contexts/factions.context';
import {
  Faction,
  Factions,
  Relationship,
  ServerTimestampedFaction,
  TimestampedFaction,
  ServerFactions,
  Relationships,
  RelationshipsType,
  Snapshot,
} from '../types';

interface ComparableHydratedFactionProps {
  id: string;
  next: TimestampedFaction;
  prev: TimestampedFaction;
  factions: Factions;
}

type Operation = 'add' | 'delete';

interface Instruction {
  docId: string;
  diffId: string;
  operation: Operation;
  type: Relationship;
}

export function useApi() {
  const createFaction = async (data: Faction) => {
    const newDoc: ServerTimestampedFaction = {
      ...data,
      created: serverTimestamp(),
      updated: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(FACTION_COLLECTION_REFERENCE, newDoc);
      if (IS_DEVELOPMENT) console.log('Faction created with ID: ', docRef.id);
      return docRef;
    } catch (error: any) {
      throw error;
    }
  };

  const difference = (setA: Set<string>, setB: Set<string>) => {
    let _difference = new Set(setA);
    setB.forEach((elem) => _difference.delete(elem));
    return _difference;
  };

  const compareRelationships = (
    id: string,
    next: Relationships,
    prev: Relationships
  ) => {
    let instructions: Instruction[] = [];

    for (let relationship in next) {
      const type = relationship as Relationship;
      const nextSet = new Set(next[type]);
      const prevSet = new Set(prev[type]);
      const added = Array.from(difference(nextSet, prevSet));
      const deleted = Array.from(difference(prevSet, nextSet));

      if (added.length > 0) {
        for (let docId of added) {
          instructions = [
            ...instructions,
            { docId, diffId: id, operation: 'add', type },
          ];
        }
      }

      if (deleted.length > 0) {
        for (let docId of deleted) {
          instructions = [
            ...instructions,
            { docId, diffId: id, operation: 'delete', type },
          ];
        }
      }
    }
    return instructions;
  };

  const formatFactionRelationship = (
    doc: TimestampedFaction,
    type: Relationship,
    data: string[]
  ): TimestampedFaction => {
    const updatedType: RelationshipsType = { [type]: data };
    return {
      ...doc,
      relationships: {
        ...doc.relationships,
        ...updatedType,
      },
    };
  };

  const mergeIntructions = (
    instructions: Instruction[],
    factions: Factions
  ): Factions => {
    let nextDocs: Factions = {};

    for (let { docId, type, operation, diffId } of instructions) {
      let doc = nextDocs[docId] || factions[docId];

      let data = new Set(doc.relationships[type]);
      if (operation === 'add') {
        data.add(diffId);
      } else if (operation === 'delete') {
        data.delete(diffId);
      }

      const nextDoc = formatFactionRelationship(doc, type, Array.from(data));

      nextDocs = { ...nextDocs, [docId]: nextDoc };
    }
    return nextDocs;
  };

  const updateTimestamps = (nextDocs: Factions): ServerFactions => {
    let updatedDocs: ServerFactions = {};
    for (let id in nextDocs) {
      updatedDocs = {
        ...updatedDocs,
        [id]: { ...nextDocs[id], updated: serverTimestamp() },
      };
    }
    return updatedDocs;
  };

  const batchUpdates = async (nextDocs: ServerFactions) => {
    const batch = writeBatch(db);

    for (let docId in nextDocs) {
      batch.update(factionDocumentReference(docId), {
        ...nextDocs[docId],
      });
      if (IS_DEVELOPMENT)
        console.log(
          '%cFaction:',
          'font-weight: bold',
          nextDocs[docId].name,
          `[${docId}]`,
          'edited'
        );
    }

    try {
      await batch.commit();
    } catch (error: any) {
      throw error;
    }
  };

  const editFaction = async ({
    id,
    next,
    prev,
    factions,
  }: ComparableHydratedFactionProps) => {
    const instructions = compareRelationships(
      id,
      next.relationships,
      prev.relationships
    );
    const nextDocs = mergeIntructions(instructions, factions);
    const stampedDocs = updateTimestamps({ ...nextDocs, [id]: next });

    try {
      if (Object.keys(stampedDocs).length > 1) {
        await batchUpdates(stampedDocs);
      } else {
        await updateDoc(factionDocumentReference(id), {
          ...stampedDocs[id],
        });
        if (IS_DEVELOPMENT)
          console.log(
            '%cFaction edited:',
            'font-weight: bold',
            stampedDocs[id].name,
            `[${id}]`
          );
      }
    } catch (error: any) {
      throw error;
    }
  };

  const deleteFaction = async (id: string) => {
    const nextDoc: Partial<ServerTimestampedFaction> = {
      visibility: 'private',
      updated: serverTimestamp(),
    };
    try {
      await updateDoc(factionDocumentReference(id), {
        ...nextDoc,
      });
      if (IS_DEVELOPMENT) console.log('Faction deleted with ID: ', id);
      return;
    } catch (error: any) {
      throw error;
    }
  };

  const getFactions = async (): Promise<FactionsContextType> => {
    try {
      const docs = await getDocs(FACTION_COLLECTION_QUERY);
      let factions = {};
      let lastUpdate = new Timestamp(0, 0);
      docs.forEach((doc) => {
        const data = doc.data();
        factions = { ...factions, [doc.id]: data };
        lastUpdate =
          data.updated && data.updated.toMillis() > lastUpdate.toMillis()
            ? data.updated
            : lastUpdate;
      });

      return { factions, lastUpdate };
    } catch (error: any) {
      throw error;
    }
  };

  interface CreateSnapshot {
    factions: Factions;
    lastUpdate: Timestamp;
  }

  const createSnapshot = async ({ factions, lastUpdate }: CreateSnapshot) => {
    if (!factions) return;

    const newDoc: Snapshot = {
      factions,
      lastUpdate,
      created: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(SNAPSHOT_COLLECTION_REFERENCE, newDoc);
      if (IS_DEVELOPMENT) console.log('Snapshot created with ID: ', docRef.id);
    } catch (error) {
      throw error;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const patchFactionUrls = async () => {
    try {
      const docs = await getDocs(FACTION_COLLECTION_QUERY);

      let factions: Factions = {};
      let lastUpdate = new Timestamp(0, 0);
      docs.forEach((doc) => {
        const data: any = doc.data();
        factions = {
          ...factions,
          [doc.id]: {
            ...data,
            urls: { wiki: '', discord: '', subreddit: '', ...data.urls },
          },
        };
        lastUpdate =
          data.updated && data.updated.toMillis() > lastUpdate.toMillis()
            ? data.updated
            : lastUpdate;
      });

      const batch = writeBatch(db);

      for (let docId in factions) {
        batch.update(factionDocumentReference(docId), {
          ...factions[docId],
        });
        if (IS_DEVELOPMENT)
          console.log(
            '%cFaction:',
            'font-weight: bold',
            factions[docId].name,
            `[${docId}]`,
            'edited'
          );
      }

      try {
        await batch.commit();
      } catch (error: any) {
        throw error;
      }

      return { factions, lastUpdate };
    } catch (error: any) {
      throw error;
    }
  };

  return {
    createFaction,
    editFaction,
    deleteFaction,
    getFactions,
    createSnapshot,
  };
}
