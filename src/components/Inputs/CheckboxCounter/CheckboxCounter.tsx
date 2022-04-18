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
    <div className="flex h-5 items-center gap-x-2 px-2">
      <Checkbox
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-1/3 justify-between"
      >
        {label}
      </Checkbox>
      <div className="flex flex-1 justify-between gap-x-2">
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
    </div>
  );
}

export default CheckboxCounter;
