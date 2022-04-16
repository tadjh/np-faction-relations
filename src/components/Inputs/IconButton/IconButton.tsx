import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<FontAwesomeIconProps, 'icon'> {}

function IconButton({
  onClick: handleOnClick,
  type = 'button',
  icon,
  className,
  children,
  hidden,
}: IconButtonProps) {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={clsx(className, 'z-10 cursor-pointer transition')}
      hidden={hidden}
    >
      <FontAwesomeIcon icon={icon} />
      {children}
    </button>
  );
}

export default IconButton;
