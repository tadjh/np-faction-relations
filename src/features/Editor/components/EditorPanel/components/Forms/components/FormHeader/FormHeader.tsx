import { HTMLAttributes } from 'react';

function FormHeader({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <h3 className="px-2 pt-4">
        <span>{children}</span>
      </h3>
      <hr />
    </>
  );
}

export default FormHeader;
