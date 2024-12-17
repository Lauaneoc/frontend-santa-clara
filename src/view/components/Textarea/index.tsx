import React from 'react';

interface TextareaProps {
  id: string;
  label: string;
  name: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  name,
  rows = 4,
  value = '',
  placeholder = '',
  onChange,
}) => {
  return (
    <div className='box-border   px-[2px]'>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline box-border outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default Textarea;
