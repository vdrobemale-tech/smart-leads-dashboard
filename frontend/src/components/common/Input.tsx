import {
  InputHTMLAttributes,
  forwardRef,
  ReactNode,
} from 'react';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      label,
      error,
      icon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId =
      id ||
      label
        ?.toLowerCase()
        .replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`block w-full rounded-lg border py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              icon ? 'pl-10 pr-3' : 'px-3'
            } ${
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300'
            } ${className}`}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
