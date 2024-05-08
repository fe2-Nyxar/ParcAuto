export default function ExpectedHeadersFromTheCsv({ headers }) {
    return (
        <>
            <span className="block font-medium text-gray-700">
                your .csv Headers should be the following:
            </span>
            {headers.map((val, index) => (
                <div className="text-sm text-gray-500 ml-4" key={index}>
                    {val}
                </div>
            ))}
        </>
    );
}
