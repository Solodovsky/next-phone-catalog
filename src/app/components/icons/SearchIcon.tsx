import React from "react";

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export const SearchIcon: React.FC<IconProps> = ({
  className = "",
  width = 16,
  height = 16,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <circle cx="6.5" cy="6.5" r="4.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="m10 10 3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
