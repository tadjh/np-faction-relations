import { HTMLAttributes } from 'react';

function FormHeader({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <h3 className="pt-4 px-2">
        <span>{children}</span>
      </h3>
      <hr />
    </>
  );
}

export default FormHeader;
