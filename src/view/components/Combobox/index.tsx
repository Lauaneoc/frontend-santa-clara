import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'; // Ícones de abrir e fechar

interface ComboBoxProps<T> {
  options: T[];
  value: string | number | null;
  label?: string;
  onChange: (selectedId: string | number) => void;
  getExtractorLabel: (option: T) => string;
  getExtractorValue: (option: T) => string | number;
}

const ComboBox = <T,>({
  options,
  value,
  onChange,
  label,
  getExtractorLabel,
  getExtractorValue,
}: ComboBoxProps<T>) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          getExtractorLabel(option).toLowerCase().includes(query.toLowerCase())
        );

  const selectedOption = options.find(
    (option) => getExtractorValue(option) === value
  );

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
        value={selectedOption || null}
        // @ts-ignore
        onChange={(selected: T) => onChange(getExtractorValue(selected))}
        as="div"
        // @ts-ignore
        onOpenChange={setIsOpen}
      >
        <div className="relative">
          <Combobox.Input
            className="border border-gray-300 p-2 py-1.5 rounded-md w-full text-sm"
            placeholder="Selecione ou digite..."
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(option: T) =>
              option ? getExtractorLabel(option) : ""
            }
          />
          <Combobox.Button
            className="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            {isOpen ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-600" /> 
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" /> 
            )}
          </Combobox.Button>
          <Combobox.Options
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg z-10"
          >
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-gray-500">Nenhum resultado encontrado</div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={getExtractorValue(option)}
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
        </div>
      </Combobox>
    </div>
  );
};

export default ComboBox;
