import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import SubmitButton from '../SubmitButton';

function SignIn() {
  let navigate = useNavigate();
  let location = useLocation();
  let { signIn } = useAuth();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  // const handleEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   setPassword(event.target.value);
  // };

  const state = location.state as any;

  let from: string = state?.from?.pathname || '/';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFetching(true);

    try {
      await signIn();
      setIsFetching(false);
      navigate(from, { replace: true });
    } catch (error) {
      setIsFetching(false);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center shadow w-full bg-white">
      <div className="bg-stone-700 text-white text-opacity-90 w-full">
        <div className="flex justify-between items-center p-2 group">
          <span>sign in</span>
        </div>
      </div>
      <form
        className="text-xs border-l border-b border-r w-full gap-y-2 flex flex-col"
        onSubmit={handleSubmit}
      >
        {/* <div className="flex gap-x-2 items-center px-2 pt-2">
          <label htmlFor="email" className="w-32">
            email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="border flex-1"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="password" className="w-32">
            password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="border flex-1"
            value={password}
            onChange={handlePassword}
          />
        </div> */}
        <div className="px-2 pt-2">
          You do not have permission to edit this page. Please sign in.
        </div>
        <div className="w-full flex justify-end items-center p-2 h-11">
          <SubmitButton isFetching={isFetching}>sign in</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
