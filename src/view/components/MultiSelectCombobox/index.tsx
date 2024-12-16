import { useState, useEffect } from "react";

interface MultiSelectComboBoxProps<T> {
  options: T[];
  values: Array<string | number>;
  label?: string;
  onChange: (selectedIds: Array<string | number>) => void;
  getExtractorLabel: (option: T) => string;
  getExtractorValue: (option: T) => string | number;
}

const MultiSelectComboBox = <T,>({
  options,
  values,
  label,
  onChange,
  getExtractorLabel,
  getExtractorValue,
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
      <input
        type="text"
        className="border border-gray-300 p-2 py-1.5 rounded-md w-full"
        placeholder="Selecione ou digite..."
        value={query || selectedLabels} // Dá prioridade ao texto digitado
        onChange={(e) => setQuery(e.target.value)}
        onClick={handleInputClick}
      />
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
    </div>
  );
};

export default MultiSelectComboBox;
