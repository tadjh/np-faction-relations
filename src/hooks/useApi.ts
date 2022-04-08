import {
  addDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { IS_DEVELOPMENT } from '../config/environment';
import {
  db,
  factionDocumentReference,
  FACTION_COLLECTION_QUERY,
  FACTION_COLLECTION_REFERENCE,
} from '../config/firebase';
import { FactionsContextType } from '../contexts/factions.context';
import {
  FactionProps,
  AssociativeFactionProps,
  Relationship,
  ServerTimeFactionProps,
  TimestampedFactionProps,
  ServerAssociativeFactionProps,
  RelationshipData,
  RelationshipDataType,
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
      if (IS_DEVELOPMENT) console.log('Document written with ID: ', docRef.id);
      return docRef;
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  };

  interface ComparableHydratedFactionProps {
    id: string;
    next: TimestampedFactionProps;
    prev: TimestampedFactionProps;
    factions: AssociativeFactionProps;
  }

  function difference(setA: Set<string>, setB: Set<string>) {
    let _difference = new Set(setA);
    setB.forEach((elem) => _difference.delete(elem));
    return _difference;
  }

  type Operation = 'add' | 'delete';

  interface Instruction {
    docId: string;
    diffId: string;
    operation: Operation;
    type: Relationship;
  }

  const compareRelationships = (
    id: string,
    next: RelationshipData,
    prev: RelationshipData
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

  const composeFactionRelationship = (
    doc: TimestampedFactionProps,
    type: Relationship,
    data: string[]
  ): TimestampedFactionProps => {
    const updatedType: RelationshipDataType = { [type]: data };
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
    factions: AssociativeFactionProps
  ): AssociativeFactionProps => {
    let nextDocs: AssociativeFactionProps = {};

    for (let { docId, type, operation, diffId } of instructions) {
      let doc = nextDocs[docId] || factions[docId];

      let data = new Set(doc.relationships[type]);
      if (operation === 'add') {
        data.add(diffId);
      } else if (operation === 'delete') {
        data.delete(diffId);
      }

      const nextDoc = composeFactionRelationship(doc, type, Array.from(data));

      nextDocs = { ...nextDocs, [docId]: nextDoc };
    }
    return nextDocs;
  };

  const updateTimestamps = (
    nextDocs: AssociativeFactionProps
  ): ServerAssociativeFactionProps => {
    let updatedDocs: ServerAssociativeFactionProps = {};
    for (let id in nextDocs) {
      updatedDocs = {
        ...updatedDocs,
        [id]: { ...nextDocs[id], updated: serverTimestamp() },
      };
    }
    return updatedDocs;
  };

  const batchUpdates = async (nextDocs: ServerAssociativeFactionProps) => {
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
    } catch (error) {
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
            '%cFaction:',
            'font-weight: bold',
            stampedDocs[id].name,
            `[${id}]`,
            'edited'
          );
      }
    } catch (error) {
      console.error('Error editing document: ', error);
      throw error;
    }
  };

  const deleteFaction = async (id: string) => {
    const nextDoc: Partial<ServerTimeFactionProps> = {
      visibility: 'private',
      updated: serverTimestamp(),
    };
    try {
      await updateDoc(factionDocumentReference(id), {
        ...nextDoc,
      });
      if (IS_DEVELOPMENT) console.log('Document deleted with ID: ', id);
      return;
    } catch (error) {
      console.error('Error deleting document: ', error);
      throw error;
    }
  };

  const getFactions = async (): Promise<FactionsContextType> => {
    try {
      const docs = await getDocs(FACTION_COLLECTION_QUERY);
      let factions = {};
      let updated = 0;
      docs.forEach((doc) => {
        const data = doc.data();
        factions = { ...factions, [doc.id]: data };
        updated =
          data.updated && data.updated.seconds > updated
            ? data.updated.seconds
            : updated;
      });

      console.log('factions', factions);

      const length = Object.keys(factions).length;

      return { factions, updated, length };
    } catch (error) {
      throw error;
    }
  };

  type OldRelationshipData = {
    [key in Relationship]: { type: Relationship; data: string[] };
  };

  type NewRelationshipData = {
    [key in Relationship]: string[];
  };

  const getFactionsFix = async (): Promise<FactionsContextType> => {
    try {
      const docs = await getDocs(FACTION_COLLECTION_QUERY);
      let factions = {};
      let updated = 0;

      const batch = writeBatch(db);

      docs.forEach((doc) => {
        const data = doc.data() as any;

        const relationships = data.relationships as OldRelationshipData;

        let nextRelationships = {} as NewRelationshipData;

        for (let relationship in relationships) {
          const relationshipData =
            relationships[relationship as Relationship].data;
          const relationshipArray = [...relationshipData];

          delete data.relationships[relationship];

          nextRelationships = {
            ...nextRelationships,
            [relationship]: relationshipArray,
          };
        }

        const nextDoc = {
          ...data,
          relationships: nextRelationships,
          updated: serverTimestamp(),
        };

        batch.set(factionDocumentReference(doc.id), { ...nextDoc });

        factions = { ...factions, [doc.id]: nextDoc };
        updated =
          data.updated && data.updated.seconds > updated
            ? data.updated.seconds
            : updated;
      });

      try {
        await batch.commit();
      } catch (error) {
        throw error;
      }

      const length = Object.keys(factions).length;

      return { factions, updated, length };
    } catch (error) {
      throw error;
    }
  };

  return {
    createFaction,
    editFaction,
    deleteFaction,
    getFactions,
    getFactionsFix,
  };
}
