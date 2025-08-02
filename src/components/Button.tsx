import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button  = ({
  onClick,
  children: btnLabel,
  className = '',
}: ButtonProps) => {
  const combinedClassName = `py-2 px-4 rounded-full font-semibold transition-colors duration-300 ${className}`;

  return (
    <button onClick={onClick} className={combinedClassName}>
      {btnLabel}
    </button>
  );
};

export default Button;