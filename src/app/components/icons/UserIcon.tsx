import React from 'react';

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
};

export const UserIcon: React.FC<IconProps> = ({
  className = '',
  width = 16,
  height = 16,
  fill = 'currentColor',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8ZM8 9C6.34315 9 5 7.65685 5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6C11 7.65685 9.65685 9 8 9Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 10C6.067 10 4.5 11.567 4.5 13.5C4.5 13.7761 4.27614 14 4 14C3.72386 14 3.5 13.7761 3.5 13.5C3.5 11.0147 5.51472 9 8 9C10.4853 9 12.5 11.0147 12.5 13.5C12.5 13.7761 12.2761 14 12 14C11.7239 14 11.5 13.7761 11.5 13.5C11.5 11.567 9.933 10 8 10Z"
      />
    </svg>
  );
};

export default UserIcon;
