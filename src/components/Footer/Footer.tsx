import { useFactions } from '../../hooks';

function Footer() {
  const { updated } = useFactions();
  return (
    <div className="flex gap-x-2 text-[8px] p-2 w-full justify-center">
      <div>{updated !== '' && `Last updated ${updated}`}</div>
    </div>
  );
}

export default Footer;
