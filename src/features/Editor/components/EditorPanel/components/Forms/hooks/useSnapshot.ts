import { useMutation } from 'react-query';
import { useApi } from '../../../../../../../hooks';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../../../../../utils';
import {
  CREATE_SNAPSHOT_IS_LOADING_TEXT,
  CREATE_SNAPSHOT_IS_SUCCESS_TEXT,
  CREATE_SNAPSHOT_IS_ERROR_TEXT,
} from '../../../config/strings';
import { Factions } from '../../../../../../../types';
import { Timestamp } from 'firebase/firestore';
import { HALF_DAY_IN_MILLISECONDS } from '../../../../../../../config/constants';

export function shouldCreateSnapshot(last: number) {
  return Date.now() - last > HALF_DAY_IN_MILLISECONDS;
}

export function useSnapshot() {
  const { createSnapshot } = useApi();

  const snapshotMutation = useMutation(createSnapshot, {
    onMutate: () => {
      toast.loading(CREATE_SNAPSHOT_IS_LOADING_TEXT, {
        id: 'create-snapshot',
      });
    },
    onSuccess: () => {
      toast.success(CREATE_SNAPSHOT_IS_SUCCESS_TEXT, { id: 'create-snapshot' });
    },
    onError: (error) => {
      toast.error(CREATE_SNAPSHOT_IS_ERROR_TEXT + getErrorMessage(error), {
        id: 'create-snapshot',
      });
    },
  });

  const handleSnapshot = (factions: Factions | null, lastUpdate: Timestamp) => {
    if (!factions) return;
    if (shouldCreateSnapshot(lastUpdate.toMillis())) {
      snapshotMutation.mutate({ factions, lastUpdate });
    }
  };

  return { handleSnapshot };
}
