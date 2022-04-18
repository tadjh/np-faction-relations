import {
  LABEL_TEXT_NAME,
  LABEL_TEXT_DISPLAY_NAME,
  LABEL_TEXT_INFO,
  LABEL_TEXT_OPTIONAL,
} from '../../../../config/strings';
import { getDisplayName, getName } from '../../../../../../../../hooks';
import FormHeader from '../FormHeader';
import Input from '../../../../../../../../components/Inputs/TextInput';
import { UseFormData } from '../../hooks';

function FormInfo({ state, handlers }: UseFormData) {
  const { handleName, handleDisplayName } = handlers;
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
    </>
  );
}

export default FormInfo;
