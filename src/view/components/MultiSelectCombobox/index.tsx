import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'; // Ícones de abrir e fechar

interface MultiSelectComboBoxProps<T> {
  options: T[];
  values: Array<string | number>;
  label?: string;
  onChange: (selectedIds: Array<string | number>) => void;
  getExtractorLabel: (option: T) => string;
  getExtractorValue: (option: T) => string | number;
  error?: string
}

const MultiSelectComboBox = <T,>({
  options,
  values,
  label,
  onChange,
  getExtractorLabel,
  getExtractorValue,
  error
}: MultiSelectComboBoxProps<T>) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions =
    query === ""
      ? options || []
      : options.filter((option) =>
          getExtractorLabel(option).toLowerCase().includes(query.toLowerCase())
        );

  const toggleSelection = (selectedId: string | number) => {
    if (values.includes(selectedId)) {
      onChange(values.filter((id) => id !== selectedId));
    } else {
      onChange([...values, selectedId]);
    }
    setQuery("");
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const selectedLabels = options
    .filter((option) => values.includes(getExtractorValue(option)))
    .map(getExtractorLabel)
    .join(", ");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".relative")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 pb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          className="border border-gray-300 p-2 py-1.5 rounded-md w-full text-sm pr-10"
          placeholder="Selecione ou digite..."
          value={query || selectedLabels} 
          onChange={(e) => setQuery(e.target.value)}
          onClick={handleInputClick}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-2"
          onClick={handleInputClick}
        >
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg z-10">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-gray-500">Nenhum resultado encontrado</div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = values.includes(getExtractorValue(option));
              return (
                <div
                  key={getExtractorValue(option)}
                  className={`cursor-pointer select-none p-2 ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                  onClick={() => toggleSelection(getExtractorValue(option))}
                >
                  {getExtractorLabel(option)}
                </div>
              );
            })
          )}
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default MultiSelectComboBox;
