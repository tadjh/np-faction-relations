import {
  LABEL_TEXT_INFO,
  LABEL_TEXT_NAME,
  LABEL_TEXT_DISPLAY_NAME,
  LABEL_TEXT_OPTIONAL,
  LABEL_TEXT_HAS_BENCH,
  LABEL_TEXT_BENCH_COUNT,
  LABEL_TEXT_HAS_LAB,
  LABEL_TEXT_LAB_COUNT,
  LABEL_TEXT_SORT_ORDER,
} from '../../../../../../../../config/strings';
import {
  getBenchCount,
  getDisplayName,
  getHasBench,
  getHasLab,
  getLabCount,
  getName,
  getOrder,
} from '../../../../../../../../hooks';
import FormHeader from '../FormHeader';
import CheckboxCounter from '../../../../../../../../components/Inputs/CheckboxCounter';
import Counter from '../../../../../../../../components/Inputs/Counter';
import Input from '../../../../../../../../components/Inputs/TextInput';
import { UseFormData } from '../../hooks';

function FormInfo({ state, handlers }: UseFormData) {
  const {
    handleName,
    handleDisplayName,
    handleHasBench,
    handleBenchCount,
    handleHasLab,
    handleLabCount,
    handleOrder,
  } = handlers;
  return (
    <>
      <FormHeader>{LABEL_TEXT_INFO}</FormHeader>
      <Input
        name={LABEL_TEXT_NAME}
        type="text"
        value={getName(state)}
        onChange={handleName}
      >
        {LABEL_TEXT_NAME}
      </Input>
      <Input
        name="displayName"
        type="text"
        value={getDisplayName(state)}
        onChange={handleDisplayName}
      >
        {LABEL_TEXT_DISPLAY_NAME}{' '}
        <span className="text-[8px]">{LABEL_TEXT_OPTIONAL}</span>
      </Input>
      <CheckboxCounter
        name="hasBench"
        label={LABEL_TEXT_HAS_BENCH}
        checked={getHasBench(state)}
        onChange={handleHasBench}
        countLabel={LABEL_TEXT_BENCH_COUNT}
        count={getBenchCount(state)}
        onChangeCount={handleBenchCount}
      />
      <CheckboxCounter
        name="hasLab"
        label={LABEL_TEXT_HAS_LAB}
        checked={getHasLab(state)}
        onChange={handleHasLab}
        countLabel={LABEL_TEXT_LAB_COUNT}
        count={getLabCount(state)}
        onChangeCount={handleLabCount}
      />
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

export default FormInfo;
