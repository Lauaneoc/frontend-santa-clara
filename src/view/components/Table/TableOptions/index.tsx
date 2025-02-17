import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

interface Option {
  label: string
  onClick: () => void
}

interface TableOptionsProps {
  options: Option[]
}

const TableOptions: React.FC<TableOptionsProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (onClick: () => void) => {
    onClick()
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      // Pega as coordenadas do botão para posicionar o dropdown
      const rect = buttonRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      })
    }
  }, [isOpen])

  // Conteúdo do dropdown em si
  const dropdownContent = isOpen ? (
    <div
      className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      style={{ top: position.top, left: position.left }}
    >
      <div className="py-1 flex flex-col">
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
  ) : null

  return (
    <>
      <div className="relative text-left">
        <button
          ref={buttonRef}
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
      </div>

      {/** Aqui está o “portal” em si, jogando no document.body */}
      {createPortal(dropdownContent, document.body)}
    </>
  )
}

export default TableOptions
