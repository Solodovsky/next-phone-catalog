import React from 'react';

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export const LogoIcon: React.FC<IconProps> = ({
  className = '',
  width = 80,
  height = 28,
}) => {
  return (
    <img
      src="/img/icons/Logo.svg"
      alt="Logo"
      className={className}
      width={width}
      height={height}
    />
  );
};

export default LogoIcon;
