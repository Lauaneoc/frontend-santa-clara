import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, placeholder = '', type = 'text', error, helperText, className, ...props }, ref) => {
    return (
      <div className={twMerge("w-full ", className)}>
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="mt-1">
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            ref={ref} // Aqui você passa o ref
            className={twMerge(
              "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
              error ? 'border-red-500' : 'border-gray-300'
            )}
            {...props}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          {helperText && !error && (
            <p className="mt-2 text-sm text-gray-500">{helperText}</p>
          )}
        </div>
      </div>
    );
  }
);

// Não esqueça de definir um displayName para facilitar a depuração
Input.displayName = 'Input';
