import TextInput from "@/Components/Inputs/TextInput";
import SelectInput from "@/Components/Inputs/SelectInput";
import InputLabel from "@/Components/Inputs/InputLabel";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/Inputs/InputError";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
export default function ManipulatePagination({ paginationData, Uri }) {
    const { data, setData, processing, errors, get } = useForm({
        elementsPerPage: null,
        page: null,
    });
    
    const elementsPerPage = () => {
        get(Uri, {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <>
            <h1 className="text-4l font-bold text-gray-900 mb-2">
                Current Page: {paginationData.current_page}
            </h1>
            <InputLabel
                htmlFor="elementsPerPage"
                value={`Select a page: (max ${paginationData.last_page})`}
                className="mb-2 mt-5"
            />
            <TextInput
                autoComplete="off"
                id="page"
                type="text"
                name="page"
                placeholder="page number"
                className="mt-1 block mb-1 ml-5"
                isFocused={true}
                onChange = {(e)=>{
                    setData("page", e.target.value);
                }}
            />

                <InputError message={errors.page} className="mt-2" />

            <InputLabel
                className="mb-2 mt-5"
                htmlFor="elementsPerPage"
                value="Elements per Page:"
            />
            <div className="ml-5">
                <SelectInput
                    Change={(e) => {
                        setData("elementsPerPage", e.target.value);
                    }}
                    className=" block w-52 px-4 py-2.5 mb-5 bg-gray-50 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500dark:bg-white"
                    DefOptions={{ "25 (default)": 25 }}
                    Options={{
                        10: 10,
                        50: 50,
                        75: 75,
                        100: 100,
                        150: 150,
                        200: 200,
                    }}
                />
                <InputError message={errors.elementsPerPage} className="mt-2" />

                <SecondaryButton
                    disabled={processing}
                    type="submit"
                    onClick={elementsPerPage}
                >
                    Filter
                </SecondaryButton>
            </div>
        </>
    );
}
