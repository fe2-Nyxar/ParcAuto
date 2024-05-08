export function ExportButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 mx-2 py-2 bg-yellow-200 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 
                uppercase tracking-widest shadow-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
                disabled:opacity-25 transition ease-in-out duration-150 select-none	 ${
                    disabled && "opacity-25  cursor-not-allowed"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
