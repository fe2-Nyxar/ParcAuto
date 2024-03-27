import { forwardRef, useRef, useState } from "react";

const UploadInput = forwardRef(({ change, ...props }, ref) => {
    const inputRef = ref || useRef();
    const [fileName, setFileName] = useState("");
    const [fileType, setFileType] = useState("");
    const [fileImported, setFileImported] = useState(false);

    const handleUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setFileType(selectedFile.type);
            setFileImported(true);
        } else {
            setFileName("");
            setFileType("");
            setFileImported(false);
        }
    };

    const handleChange = (e) => {
        handleUpload(e);
        console.log(change);
        if (change) {
            change(e);
        }
    };

    return (
        <div className="flex justify-center bg-gray-100 user-select-none">
            <label
                className={`user-select-none w-36 flex flex-col items-center px-2 py-4 bg-white text-${
                    fileImported ? "green" : "blue"
                }-600 rounded-lg shadow-md tracking-wide uppercase border border-${
                    fileImported ? "green" : "blue"
                }-600 cursor-pointer hover:bg-${
                    fileImported ? "green" : "blue"
                }-600 hover:text-white`}
            >
                <svg
                    className="w-8 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-1 text-sm leading-normal user-select-none">
                    {fileImported ? "File selected" : "Select a file"}
                </span>
                <input
                    {...props}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    ref={inputRef}
                />
                {fileName && (
                    <p
                        className={`text-xs user-select-none ${
                            fileImported ? "text-lightgreen" : "text-green-500"
                        }`}
                    >
                        {fileName} - {fileType}
                    </p>
                )}
            </label>
        </div>
    );
});

export default UploadInput;
