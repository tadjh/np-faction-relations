import { Fragment, useMemo, useState } from 'react';
import clsx from 'clsx';
import FACTIONS from './config/factions';
import { backgroundColor, headerColor } from './config/styles';
import Legend from './components/Legend';
import Grid from './components/Grid';
import Notes from './components/Notes';
import logo from './assets/np-logo-dark.png';
import { DATE, LOGO_ALT_TEXT, SITE_HEADER_TEXT } from './config/constants';
import AuthProvider from './components/AuthProvider';
import RequireAuth from './components/RequireAuth';
import { Link, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Admin from './components/Admin';
import Edit from './components/Edit';

function App() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const GENERATOR = useMemo(
    () => new Array<boolean>(FACTIONS.length).fill(true),
    []
  );

  const handleOpen = () => {
    // setIsOpen(true);

    // const timeout = setTimeout(() => {
    setIsAnimating(true);
    //   clearTimeout(timeout);
    // }, 0);
  };

  const handleClose = () => {
    setIsAnimating(false);

    // const timeout = setTimeout(() => {
    //   setIsOpen(false);
    //   clearTimeout(timeout);
    // }, 150);
  };

  return (
    <>
      {/* {isOpen && ( */}
      <div
        className={clsx(
          'absolute w-[394px] h-screen top-0 left-0 bg-stone-100 border shadow-md flex flex-col gap-y-4 p-4 z-10',
          isAnimating ? 'translate-x-0' : 'translate-x-[-500px]',
          'transition-transform'
        )}
      >
        <AuthProvider>
          <Routes>
            <Route
              path="/np-faction-relations/*"
              element={<Admin onClose={handleClose} />}
            >
              <Route path="login" element={<SignIn />} />
              <Route
                path="admin"
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
      {/* )} */}
      <div
        className="grid gap-x-4 font-mono min-h-screen p-4"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        <div className="flex flex-col gap-y-4"></div>
        <div className="flex h-full justify-center items-center flex-col">
          <div className="flex items-center justify-center gap-x-2 p-2">
            <img src={logo} alt={LOGO_ALT_TEXT} width={160} />
            <span>{SITE_HEADER_TEXT}</span>
          </div>
          <Grid size={FACTIONS.length}>
            <Legend />
            {FACTIONS.map((gang, x) => (
              <div
                key={`row1col${x + 2}`}
                className={clsx(
                  'border text-center flex items-center justify-center',
                  headerColor(x),
                  'border-t-stone-900 border-b-stone-900',
                  x === FACTIONS.length - 1 && 'border-r-stone-900'
                )}
              >
                <span className="-rotate-90">{gang.nickname || gang.name}</span>
              </div>
            ))}
            {GENERATOR.map((_, y) => (
              <Fragment key={FACTIONS[y].id}>
                <div
                  key={`row${y + 2}col1`}
                  className={clsx(
                    'border text-center flex items-center justify-center border-l-stone-900 border-r-stone-900',
                    y === FACTIONS.length - 1 && 'border-b-stone-900',
                    headerColor(y)
                  )}
                >
                  {FACTIONS[y].nickname || FACTIONS[y].name}
                </div>
                {GENERATOR.map((_, x) => (
                  <div
                    key={`row${y + 2}col${x + 2}`}
                    className={clsx(
                      'border text-center flex justify-center items-center',
                      backgroundColor(FACTIONS, x, y),
                      y === FACTIONS.length - 1 && 'border-b-stone-900',
                      x === FACTIONS.length - 1 && 'border-r-stone-900'
                    )}
                  >
                    {x === y && FACTIONS[y].benchCount > 1 && (
                      <span className="text-xs text-amber-100">
                        {FACTIONS[y].benchCount}
                      </span>
                    )}
                  </div>
                ))}
              </Fragment>
            ))}
          </Grid>
          <div className="flex gap-x-2 text-[8px] p-2 w-full justify-between">
            <Link
              to="/np-faction-relations/admin"
              onClick={handleOpen}
              className="hover:underline"
            >
              edit
            </Link>
            <div>{DATE}</div>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center gap-y-4">
          <Notes />
        </div>
      </div>
    </>
  );
}

export default App;
