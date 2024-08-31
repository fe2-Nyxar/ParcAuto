export default function TablesHeaders({ Headers }) {
    return (
        <>
            <thead>
                <tr className="bg-gray-600 text-white">
                    {Headers.map((value, index) => (
                        <th
                            className="font-bold px-4 py-2 border-b text-left"
                            key={index}
                        >
                            {value}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    );
}
