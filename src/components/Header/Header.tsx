import logo from '../../assets/np-logo-dark.png';
import { LOGO_ALT_TEXT, SITE_HEADER_TEXT } from '../../config/constants';

function Header() {
  return (
    <div className="flex items-center justify-center gap-x-2 p-2 h-20">
      <img src={logo} alt={LOGO_ALT_TEXT} width={160} />
      <span>{SITE_HEADER_TEXT}</span>
    </div>
  );
}

export default Header;
