import { InputHTMLAttributes } from 'react';
import Checkbox from '../Checkbox';
import Counter from '../Counter';

export interface CheckboxCounterProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  count: number;
  countLabel: string;
  onChangeCount: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

function CheckboxCounter({
  name,
  checked,
  label,
  onChange,
  count,
  countLabel,
  onChangeCount,
}: CheckboxCounterProps) {
  return (
    <div className="flex gap-x-2 items-center px-2 h-5">
      <Checkbox
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-32"
      >
        {label}
      </Checkbox>
      <Counter
        name={`${name}Count`}
        value={count}
        onChange={onChangeCount}
        hidden={!checked}
        isWrapped={false}
      >
        {countLabel}
      </Counter>
    </div>
  );
}

export default CheckboxCounter;
