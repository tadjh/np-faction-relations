import { Link } from 'react-router-dom';
import { EVENT_TEXT_EDIT } from '../../config/strings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useEditor } from '../../hooks';

function EditLink() {
  const { openEditor: handleOpen } = useEditor();

  return (
    <Link
      to="/edit"
      onClick={handleOpen}
      className="flex items-center gap-x-1 hover:underline"
    >
      <FontAwesomeIcon icon={faPenToSquare} />
      {EVENT_TEXT_EDIT}
    </Link>
  );
}

export default EditLink;
