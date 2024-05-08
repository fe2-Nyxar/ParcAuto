export default function CustomizableButton({
    className = "",
    disabled,
    children,
    tailwindStyle = [],
    ...props
}) {
    return (
        <button
            {...props}
            type={"button"}
            className={`${tailwindStyle}` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
