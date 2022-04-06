import { Link } from 'react-router-dom';

export interface EditLinkProps {
  onClick: () => void;
}

function EditLink({ onClick }: EditLinkProps) {
  return (
    <div className="absolute p-4">
      <Link to="/edit" onClick={onClick} className="hover:underline text-[8px]">
        edit
      </Link>
    </div>
  );
}

export default EditLink;
