import { useState } from "react";
export default function SelectInput({
    DefOptions,
    Options = {},
    className = "",
    Change,
    ...props
}) {
    const [DefContent, DefValue] = Object.entries(DefOptions)[0];
    return (
        <select
            {...props}
            onChangeCapture={Change}
            className={` select-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ${className}`}
        >
            <option value={DefValue}>{DefContent}</option>
            {Object.entries(Options).map(([value, content], key) => (
                <option key={key} value={value}>
                    {content}
                </option>
            ))}
        </select>
    );
}
