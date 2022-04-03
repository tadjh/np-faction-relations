import { Fragment, useState } from 'react';
import clsx from 'clsx';
import Grid from './components/Grid';
import Notes from './components/Notes';
import logo from './assets/np-logo-dark.png';
import { DATE, LOGO_ALT_TEXT, SITE_HEADER_TEXT } from './config/constants';
import AuthProvider from './providers/AuthProvider';
import RequireAuth from './components/RequireAuth';
import { Link, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Admin from './components/Admin';
import Edit from './components/Edit';
import FactionsProvider from './providers/FactionsProvider';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <FactionsProvider>
        <div
          className={clsx(
            'absolute w-[394px] h-screen top-0 left-0 bg-stone-100 border shadow-md flex flex-col gap-y-4 p-4 z-10',
            isOpen ? 'translate-x-0' : 'translate-x-[-500px]',
            'transition-transform'
          )}
        >
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Admin onClose={handleClose} />}>
                <Route path="login" element={<SignIn />} />
                <Route
                  path="edit"
                  element={
                    <RequireAuth>
                      <Edit />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </div>
        <div
          className="grid gap-x-4 font-mono min-h-screen p-4"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
        >
          <div className="flex flex-col gap-y-4"></div>
          <div className="flex h-full justify-center items-center flex-col">
            <div className="grid grid-template-cols-grow w-full">
              <Link
                to="/edit"
                onClick={handleOpen}
                className="hover:underline text-[8px] self-end"
              >
                edit
              </Link>
              <div className="flex items-center justify-center gap-x-2 p-2">
                <img src={logo} alt={LOGO_ALT_TEXT} width={160} />
                <span>{SITE_HEADER_TEXT}</span>
              </div>
              <div />
            </div>
            <Grid />
            <div className="flex gap-x-2 text-[8px] p-2 w-full justify-between">
              <div />
              <div>{DATE}</div>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center gap-y-4">
            <Notes />
          </div>
        </div>
      </FactionsProvider>
    </>
  );
}

export default App;
