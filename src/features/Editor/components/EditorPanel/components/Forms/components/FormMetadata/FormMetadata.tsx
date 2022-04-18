import Checkbox from '../../../../../../../../components/Inputs/Checkbox';
import Counter from '../../../../../../../../components/Inputs/Counter';
import { getActive, getOrder } from '../../../../../../../../hooks';
import {
  LABEL_TEXT_IS_ACTIVE,
  LABEL_TEXT_METADATA,
  LABEL_TEXT_SORT_ORDER,
} from '../../../../config/strings';
import FormHeader from '../FormHeader';
import { UseFormData } from '../../hooks';

function FormMetadata({ state, handlers }: UseFormData) {
  const { handleOrder } = handlers;
  return (
    <>
      <FormHeader>{LABEL_TEXT_METADATA}</FormHeader>
      <div className="flex px-2">
        <Checkbox
          name="active"
          checked={getActive(state)}
          onChange={handlers.handleActive}
          className="h-5 w-1/3 justify-between"
        >
          {LABEL_TEXT_IS_ACTIVE}
        </Checkbox>
        <div className="flex-1"></div>
      </div>
      <Counter
        name="sortOrder"
        min={0}
        value={getOrder(state)}
        onChange={handleOrder}
      >
        {LABEL_TEXT_SORT_ORDER}
      </Counter>
    </>
  );
}

export default FormMetadata;
