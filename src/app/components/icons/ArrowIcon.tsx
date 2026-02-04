import React from 'react';

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

export const ArrowIcon: React.FC<IconProps> = ({
  className = '',
  width = 32,
  height = 32,
  fill = '#313237',
  stroke = '#B4BDC4',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="0"
        stroke={stroke}
        fill="none"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5286 18.4712C11.2682 18.2109 11.2682 17.7888 11.5286 17.5284L15.5286 13.5284C15.7889 13.2681 16.211 13.2681 16.4714 13.5284L20.4714 17.5284C20.7317 17.7888 20.7317 18.2109 20.4714 18.4712C20.211 18.7316 19.7889 18.7316 19.5286 18.4712L16 14.9426L12.4714 18.4712C12.211 18.7316 11.7889 18.7316 11.5286 18.4712Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowIcon;
