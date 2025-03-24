// /components/ui/button.tsx
import * as React from 'react';

// Define the type for the possible variants
type ButtonVariants = 'default' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

export function Button({
  variant = 'default', // Default to 'default' if no variant is provided
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariants, string> = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  };

  return (
    <button
      className={`py-2 px-4 rounded-md focus:outline-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
