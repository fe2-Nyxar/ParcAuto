import CustomizableButton from "./CustomizableButton";
export default function CancelButton({ Cancel, processing, ...props }) {
    const handleCancel = () => {
        if (!confirm("do you really wanna cancel")) return;
        Cancel();
    };
    const handleExist = () => {
        if (processing)
            alert(
                "unable to quit the page with a process in the background, you should cancel first!!"
            );
    };

    return (
        <>
            <CustomizableButton
                {...props}
                onClick={() => handleCancel()}
                tailwindStyle=" ml-3 inline-flex items-center px-4 py-2 bg-red-500 border border-gray-400 rounded-md font-semibold text-xs text-white uppercase tracking-widest  drop-shadow  hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
            >
                cancel
            </CustomizableButton>
        </>
    );
}
