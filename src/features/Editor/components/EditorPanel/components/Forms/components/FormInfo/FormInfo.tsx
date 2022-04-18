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
import RequiredText from '../RequiredText';

function FormInfo({ state, handlers }: UseFormData) {
  const { handleName, handleDisplayName } = handlers;
  const maxLength = 7;
  const name = getName(state);
  const isRequired = name.length > maxLength;
  return (
    <>
      <FormHeader>{LABEL_TEXT_INFO}</FormHeader>
      <Input
        name={LABEL_TEXT_NAME}
        type="text"
        value={name}
        onChange={handleName}
        className="px-2"
        required={true}
      >
        <RequiredText label={LABEL_TEXT_NAME} />
      </Input>
      <Input
        name="displayName"
        type="text"
        value={getDisplayName(state)}
        onChange={handleDisplayName}
        className="px-2"
        maxLength={maxLength}
        required={isRequired}
      >
        <RequiredText label={LABEL_TEXT_DISPLAY_NAME} isRequired={isRequired} />
        {!isRequired && (
          <span className="text-[8px]">{LABEL_TEXT_OPTIONAL}</span>
        )}
      </Input>
    </>
  );
}

export default FormInfo;
