import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/np-logo-dark.png';
import { LOGO_ALT_TEXT, SITE_HEADER_TEXT } from '../../config/constants';

function Header({ onClick }: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <div
      className="grid w-full"
      style={{ gridTemplateColumns: '1fr auto 1fr' }}
    >
      <Link
        to="/edit"
        onClick={onClick}
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
  );
}

export default Header;
