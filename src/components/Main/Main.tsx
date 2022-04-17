import { FC } from 'react';

const Main: FC = ({ children }) => {
  return (
    <main className="relative flex w-full flex-auto items-start justify-start overflow-scroll text-[8px] md:justify-center">
      {children}
    </main>
  );
};

export default Main;
