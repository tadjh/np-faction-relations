import clsx from 'clsx';
import { ChangeEventHandler, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

function LoginForm() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value);
  };

  const state = location.state as any;

  let from: string = state?.from?.pathname || '/';

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsFetching(true);

    // let formData = new FormData(event.currentTarget);
    // let username = formData.get('username') as string;
    // mock api call
    const timeout: NodeJS.Timer = setTimeout(() => {
      setIsFetching(false);

      auth.signin(username, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });

      return clearTimeout(timeout);
    }, 150);
  }

  return (
    <div className="flex items-center flex-col justify-center shadow w-full">
      <div className="bg-stone-700 text-white text-opacity-90 w-full hover:bg-stone-900 transition-colors">
        <div className="flex justify-between items-center p-2 group">
          <span>login</span>
          <span className="text-2xl cursor-pointer leading-none opacity-0 group-hover:opacity-100 transition-opacity">
            &#x2715;
          </span>
        </div>
      </div>
      <form
        className="text-xs border-l border-b border-r w-full gap-y-2 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-x-2 items-center px-2 pt-2">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            className="border"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="username">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            className="border"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="w-full flex justify-end p-2 h-11">
          {!isFetching ? (
            <button
              type="submit"
              className="text-xs hover:cursor-pointer bg-stone-700 hover:bg-stone-900 border transition-colors text-white text-opacity-90 px-4 py-1 w-16"
            >
              login
            </button>
          ) : (
            <div className="w-16 flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-stone-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
