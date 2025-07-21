import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'loadButton' | 'solveButton';
  className?: string;
}

const baseClasses = "py-2 px-4 rounded font-semibold transition-colors";
const variantClasses = {
  loadButton: "bg-blue-600 hover:bg-blue-700 text-white",
  solveButton: "bg-green-500 hover:bg-green-600 text-white",
};

const Button  = ({
  onClick,
  children,
  variant = 'loadButton',
  className = '',
}: ButtonProps) => {
  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;