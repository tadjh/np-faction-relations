import { Link } from 'react-router-dom';
import { PATH_EDIT, EVENT_TEXT_EDIT } from '../../config/strings';

export interface EditLinkProps {
  onClick: () => void;
}

function EditLink({ onClick }: EditLinkProps) {
  return (
    <div className="absolute p-4">
      <Link
        to={`/${PATH_EDIT}`}
        onClick={onClick}
        className="hover:underline text-[8px]"
      >
        {EVENT_TEXT_EDIT}
      </Link>
    </div>
  );
}

export default EditLink;
