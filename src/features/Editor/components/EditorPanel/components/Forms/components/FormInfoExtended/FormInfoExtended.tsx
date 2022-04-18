import Input from '../../../../../../../../components/Inputs/TextInput';
import { LABEL_TEXT_LINK } from '../../../../config/strings';
import { UseFormData } from '../../hooks';

function FormInfoExtended({ state, handlers }: UseFormData) {
  return (
    <>
      <Input name={LABEL_TEXT_LINK} type="url" value={''} onChange={() => {}}>
        {LABEL_TEXT_LINK}
      </Input>
    </>
  );
}

export default FormInfoExtended;
