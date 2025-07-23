import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const baseClasses = "py-2 px-4 rounded-full font-semibold transition-colors";

const Button  = ({
  onClick,
  children,
  className = '',
}: ButtonProps) => {
  const combinedClassName = `${baseClasses} ${className}`;

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;