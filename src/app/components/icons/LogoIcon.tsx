import React from 'react';
import Image from 'next/image';

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
  const w = typeof width === 'number' ? width : Number.parseInt(String(width), 10) || 80;
  const h = typeof height === 'number' ? height : Number.parseInt(String(height), 10) || 28;

  return (
    <Image
      src="/img/icons/Logo.svg"
      alt="Logo"
      className={className}
      width={w}
      height={h}
      unoptimized
    />
  );
};

export default LogoIcon;
