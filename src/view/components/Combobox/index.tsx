import { useState } from "react";
import { Combobox } from "@headlessui/react";

interface ComboBoxProps<T> {
  options: T[];
  label?: string;
  onChange: (selected: T) => void;
  getExtractorLabel: (option: T) => string;
}

const ComboBox = <T,>({
  options,
  onChange,
  label,
  getExtractorLabel,
}: ComboBoxProps<T>) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          getExtractorLabel(option).toLowerCase().includes(query.toLowerCase())
        );

  const handleChange = (value: T) => {
    setQuery("");
    setIsOpen(false);
    onChange(value);
  };

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700 pb-1"
        >
          {label}
        </label>
      )}
      <Combobox
        value={query}
        onChange={(value) => handleChange(value as T)}
        by={(a, b) => a === b}
      >
        <div
          className="relative"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        >
          <Combobox.Input
            className="border border-gray-300 p-2 py-1.5 rounded-md w-full"
            placeholder="Selecione ou digite..."
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(value: string) => value || ""}
          />
          <Combobox.Button
            className="absolute inset-y-0 right-0 flex items-center pr-2"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="material-icons">expandir</span>
          </Combobox.Button>
          {isOpen && (
            <Combobox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg z-10"
            >
              {filteredOptions.length === 0 ? (
                <div className="p-2 text-gray-500">Nenhum resultado encontrado</div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={getExtractorLabel(option)}
                    value={option}
                    className={({ active }) =>
                      `cursor-pointer select-none p-2 ${
                        active ? "bg-blue-500 text-white" : "text-black"
                      }`
                    }
                  >
                    {getExtractorLabel(option)}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default ComboBox;
