export default function CustomizableButton({
    className = "",
    disabled,
    type = "button",
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
