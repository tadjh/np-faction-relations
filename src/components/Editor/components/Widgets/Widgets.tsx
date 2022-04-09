import { ERROR_TEXT_WIDGETS_PERMISSION_DENIED } from '../../../../config/strings';
import { useAuth } from '../../../../hooks';
import { isAllFalse } from '../../../../utils';
import AddForm from '../Forms/AddForm';
import DeleteForm from '../Forms/DeleteForm';
import EditForm from '../Forms/EditForm';

function Widgets() {
  const { roles, canCreate, canEdit, canDelete } = useAuth();

  const shouldAllowAdd = canCreate(roles);
  const shouldAllowEdit = canEdit(roles);
  const shouldAllowDelete = canDelete(roles);
  const shouldShowError = isAllFalse(
    shouldAllowAdd,
    shouldAllowEdit,
    shouldAllowDelete
  );

  if (shouldShowError) {
    return (
      <span className="text-xs text-center">
        {ERROR_TEXT_WIDGETS_PERMISSION_DENIED}
      </span>
    );
  }
  return (
    <>
      {shouldAllowAdd && <AddForm />}
      {shouldAllowEdit && <EditForm />}
      {shouldAllowDelete && <DeleteForm />}
    </>
  );
}

export default Widgets;
