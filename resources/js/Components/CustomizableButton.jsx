export default function CustomizableButton({
    type = "button",
    className = "",
    disabled,
    children,
    tailwindStyle = [],
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`${tailwindStyle}` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
