import { ERROR_TEXT_WIDGETS_PERMISSION_DENIED } from '../../config/strings';
import { useAuth } from '../../hooks';
import AddForm from '../AddForm';
import DeleteForm from '../DeleteForm';
import EditForm from '../EditForm';

function Widgets() {
  const { roles, canCreate, canEdit, canDelete } = useAuth();

  const showAdd = canCreate(roles);
  const showEdit = canEdit(roles);
  const showDelete = canDelete(roles);
  const nothing = !showAdd && !showEdit && !showDelete && true;
  return (
    <>
      {showAdd && <AddForm />}
      {showEdit && <EditForm />}
      {showDelete && <DeleteForm />}
      {nothing && (
        <span className="text-xs text-center">
          {ERROR_TEXT_WIDGETS_PERMISSION_DENIED}
        </span>
      )}
    </>
  );
}

export default Widgets;
