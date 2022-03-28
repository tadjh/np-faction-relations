import { ChangeEventHandler, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import SubmitButton from '../SubmitButton';

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
  //hover:bg-stone-900 transition-colors
  return (
    <div className="flex items-center flex-col justify-center shadow w-full">
      <div className="bg-stone-700 text-white text-opacity-90 w-full">
        <div className="flex justify-between items-center p-2 group">
          <span>login</span>
          {/* <span className="text-2xl cursor-pointer leading-none opacity-0 group-hover:opacity-100 transition-opacity">
            &#x2715;
          </span> */}
        </div>
      </div>
      <form
        className="text-xs border-l border-b border-r w-full gap-y-2 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-x-2 items-center px-2 pt-2">
          <label htmlFor="username" className="w-32">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="border flex-1"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="username" className="w-32">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="border flex-1"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="w-full flex justify-end items-center p-2 h-11">
          <SubmitButton isFetching={isFetching}>login</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
