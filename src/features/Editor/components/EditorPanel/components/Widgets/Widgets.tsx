import { ERROR_TEXT_WIDGETS_PERMISSION_DENIED } from '../../config/strings';
import { useAuth } from '../../../../../../hooks';
import { isAllFalse } from '../../../../../../utils';
import AddFaction from '../Forms/components/AddFaction';
import DeleteFaction from '../Forms/components/DeleteFaction';
import EditFaction from '../Forms/components/EditFaction';
import AddSnapshot from '../Forms/components/AddSnapshot';

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
      <span className="text-center text-xs">
        {ERROR_TEXT_WIDGETS_PERMISSION_DENIED}
      </span>
    );
  }
  return (
    <>
      {shouldAllowAdd && <AddFaction />}
      {shouldAllowEdit && <EditFaction />}
      {shouldAllowDelete && <DeleteFaction />}
      {shouldAllowAdd && <AddSnapshot />}
    </>
  );
}

export default Widgets;
