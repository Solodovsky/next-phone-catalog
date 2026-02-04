import React from 'react';
import styles from './ButtonCard.module.scss';

type ButtonCardProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  label?: string;
  isSelected?: boolean;
};

export const ButtonCard: React.FC<ButtonCardProps> = ({
  onClick,
  className = '',
  disabled = false,
  label = 'Add to cart',
  isSelected = false,
}) => {
  return (
    <button
      className={`${styles.btnCard} ${
        isSelected ? styles.btnCardSelected : ''
      } ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
};

export default ButtonCard;
