import { Link } from 'react-router-dom';
import { EVENT_TEXT_EDIT } from '../../config/strings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export interface EditLinkProps {
  onClick: () => void;
}

function EditLink({ onClick }: EditLinkProps) {
  return (
    <div className="absolute p-2.5 md:p-4 text-[8px] z-10 font-mono">
      <Link
        to="/edit"
        onClick={onClick}
        className="hover:underline flex gap-x-1 items-center"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
        {EVENT_TEXT_EDIT}
      </Link>
    </div>
  );
}

export default EditLink;
