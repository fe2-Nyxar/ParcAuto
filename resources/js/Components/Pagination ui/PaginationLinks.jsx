import { Link } from "@inertiajs/react";
export default function PaginationLinks({
    active = false,
    children,
    ...props
}) {
    return (
        <Link
            preserveScroll
            preserveState
            {...props}
            className={`${
                active
                    ? "z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            }`}
        >
            {children}
        </Link>
    );
}
