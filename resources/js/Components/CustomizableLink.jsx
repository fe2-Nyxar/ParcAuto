import { Link } from "@inertiajs/react";
export default function CustomizableLink({
    className = "",
    children,
    tailwindStyle = {},
    ...props
}) {
    return (
        <Link {...props} className={`${tailwindStyle} ${className}`}>
            {children}
        </Link>
    );
}
