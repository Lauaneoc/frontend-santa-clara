import { useState } from 'react';

interface Option {
  label: string;
  onClick: () => void;
}

interface TableOptionsProps {
  options: Option[];
}

const TableOptions: React.FC<TableOptionsProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative text-left z-1000">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v.01M12 12v.01M12 18v.01"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1 flex flex-col z-30">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.onClick)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOptions;
