import { Link } from 'react-router-dom';
import { EVENT_TEXT_EDIT } from '../../../../config/strings';

export interface EditLinkProps {
  onClick: () => void;
}

function EditLink({ onClick }: EditLinkProps) {
  return (
    <div className="absolute p-2.5 md:p-4 text-[8px] z-10 font-mono">
      <Link to="/edit" onClick={onClick} className="hover:underline">
        {EVENT_TEXT_EDIT}
      </Link>
    </div>
  );
}

export default EditLink;
