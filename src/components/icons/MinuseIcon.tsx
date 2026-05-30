import React from 'react';

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const MinuseIcon: React.FC<IconProps> = ({
  className = '',
  width = 16,
  height = 16,
  fill = '#313237',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.66602 7.99998C2.66602 7.63179 2.96449 7.33331 3.33268 7.33331H12.666C13.0342 7.33331 13.3327 7.63179 13.3327 7.99998C13.3327 8.36817 13.0342 8.66665 12.666 8.66665H3.33268C2.96449 8.66665 2.66602 8.36817 2.66602 7.99998Z"
        fill={fill}
      />
    </svg>
  );
};

export default MinuseIcon;
