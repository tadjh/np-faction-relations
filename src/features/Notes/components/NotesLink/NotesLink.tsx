import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { LABEL_TEXT_NOTES } from '../../../../config/strings';
import { useNotes } from '../../hooks';

function NotesLink() {
  const { isNotesOpen: isOpen, openNotes: handleOpen } = useNotes();
  return (
    <div
      className={clsx(
        'absolute top-0 right-0 z-10 flex items-center gap-x-1 p-2.5 font-mono text-[8px] hover:underline md:p-4',
        isOpen ? 'opacity-0' : 'cursor-pointer opacity-100'
      )}
      onClick={handleOpen}
    >
      <FontAwesomeIcon icon={faNoteSticky} />
      {LABEL_TEXT_NOTES}
    </div>
  );
}

export default NotesLink;
