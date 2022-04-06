import { useMemo } from 'react';
import { useAuth } from '../../hooks';
import AddForm from '../AddForm';
import DeleteForm from '../DeleteForm';
import EditForm from '../EditForm';

function Widgets() {
  const { user, canCreate, canEdit, canDelete } = useAuth();

  const showAdd = useMemo(() => canCreate(user), [canCreate, user]);
  const showEdit = useMemo(() => canEdit(user), [canEdit, user]);
  const showDelete = useMemo(() => canDelete(user), [canDelete, user]);
  const nothing = !showAdd && !showEdit && !showDelete && true;
  return (
    <>
      {showAdd && <AddForm />}
      {showEdit && <EditForm />}
      {showDelete && <DeleteForm />}
      {nothing && (
        <span className="text-xs text-center">
          you don't have permission to access this widget
        </span>
      )}
    </>
  );
}

export default Widgets;