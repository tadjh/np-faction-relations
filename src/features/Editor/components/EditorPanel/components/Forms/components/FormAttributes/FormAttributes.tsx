import CheckboxCounter from '../../../../../../../../components/Inputs/CheckboxCounter';
import {
  getHasBench,
  getBenchCount,
  getHasLab,
  getLabCount,
} from '../../../../../../../../hooks';
import {
  LABEL_TEXT_HAS_BENCH,
  LABEL_TEXT_BENCH_COUNT,
  LABEL_TEXT_HAS_LAB,
  LABEL_TEXT_LAB_COUNT,
  LABEL_TEXT_ATTRIBUTES,
} from '../../../../config/strings';
import { UseFormData } from '../../hooks';
import FormHeader from '../FormHeader';

function FormAttributes({ state, handlers }: UseFormData) {
  const { handleHasBench, handleBenchCount, handleHasLab, handleLabCount } =
    handlers;

  return (
    <>
      <FormHeader>{LABEL_TEXT_ATTRIBUTES}</FormHeader>
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
    </>
  );
}

export default FormAttributes;
