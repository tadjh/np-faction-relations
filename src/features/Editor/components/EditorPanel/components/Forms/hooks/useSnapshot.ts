import { useMutation } from 'react-query';
import { useApi } from '../../../../../../../hooks';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../../../../../utils';
import {
  CREATE_SNAPSHOT_IS_LOADING_TEXT,
  CREATE_SNAPSHOT_IS_SUCCESS_TEXT,
  CREATE_SNAPSHOT_IS_ERROR_TEXT,
} from '../../../config/strings';

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

  return { snapshotMutation };
}
