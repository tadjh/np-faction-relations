import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useState } from 'react';
import { useFactions } from '../../../../../../../../hooks';
import { useSnapshot } from '../../hooks';

function CreateSnapshot() {
  const { factions, lastUpdate } = useFactions();
  const { snapshotMutation, handleSnapshot } = useSnapshot(
    factions,
    lastUpdate
  );
  const [shouldVerify, setShouldVerify] = useState(false);

  const showVerify = () => setShouldVerify(true);

  const hideVerify = () => setShouldVerify(false);

  const handleClick = () => showVerify();

  const handleDecline = () => hideVerify();

  const handleAccept = () => {
    handleSnapshot(true);
    hideVerify();
  };

  return (
    <div className="flex gap-x-2">
      <button
        type="button"
        className="flex items-center gap-x-2 self-auto border bg-slate-700 p-2 text-white hover:bg-slate-800 disabled:cursor-none disabled:opacity-50"
        onClick={handleClick}
        disabled={snapshotMutation.isSuccess}
      >
        <FontAwesomeIcon icon={faCamera} />
        new snapshot
      </button>
      <div
        className={clsx(
          'flex items-center gap-x-2 text-[10px] transition-opacity',
          shouldVerify ? 'opacity-100' : 'invisible opacity-0'
        )}
      >
        are you sure?
        <button
          className="h-5 w-6 bg-slate-500 text-white hover:bg-slate-600"
          type="button"
          onClick={handleAccept}
        >
          yes
        </button>
        <button
          className="h-5 w-6 bg-slate-500 text-white hover:bg-slate-600"
          type="button"
          onClick={handleDecline}
        >
          no
        </button>
      </div>
    </div>
  );
}

export default CreateSnapshot;
