import { DATE } from '../../config/constants';

function Footer() {
  return (
    <div className="flex gap-x-2 text-[8px] p-2 w-full justify-between">
      <div />
      <div>{DATE}</div>
    </div>
  );
}

export default Footer;
