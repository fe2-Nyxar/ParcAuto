import React from "react";

export default function Columns({ ColumnsData, trClassName, tdClassName }) {
    return (
        <>
            <tbody>
                {ColumnsData.map((value, index) => (
                    <tr
                        className={`hover:bg-stone-200 ${trClassName}`}
                        key={index}
                    >
                        <td className={`p-2 border-b text-left ${tdClassName}`}>
                            {value.ID}
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    );
}
