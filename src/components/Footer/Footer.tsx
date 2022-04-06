import { useFactions } from '../../hooks';

function Footer() {
  const { updated } = useFactions();
  return (
    <div className="flex gap-x-2 text-[8px] p-2 w-full justify-between h-7">
      <div>{window.location.hostname}</div>
      <div>{!!updated && `Last updated ${new Date(updated).toString()}`}</div>
    </div>
  );
}

export default Footer;
