import { Link } from 'react-router-dom';
import { EVENT_TEXT_EDIT } from '../../config/strings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export interface EditLinkProps {
  onClick: () => void;
}

function EditLink({ onClick }: EditLinkProps) {
  return (
    <div className="absolute z-10 p-2.5 font-mono text-[8px] md:p-4">
      <Link
        to="/edit"
        onClick={onClick}
        className="flex items-center gap-x-1 hover:underline"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
        {EVENT_TEXT_EDIT}
      </Link>
    </div>
  );
}

export default EditLink;
