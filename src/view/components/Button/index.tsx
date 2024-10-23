interface ButtonProps {
    children?: React.ReactNode
    type?: "button" | "submit" | "reset" | undefined
    disabled?: boolean
    onClick?: () => void
}

export function Button({type= "button", children, disabled, onClick, ...props}:ButtonProps) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className="rounded-md box-border font-inter h-fit bg-[#8B1513] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {children}
      </button>
    )
}