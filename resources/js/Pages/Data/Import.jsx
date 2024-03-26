import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { ImportButton } from "@/Components/ImportButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
export default function Import({ auth }) {
    const { data, setData, post, processing, errors, setError } = useForm({
        fileToImport: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (!data.fileToImport) {
            return;
        } else {
            let url;
            switch (data.fileToImport) {
                case "car":
                    url = "/car";
                    break;
                case "user":
                    url = "/user";
                    break;
                case "carAssignment":
                    url = "/carAssignment";
                    break;
                case "fuel":
                    url = "/fuel";
                    break;
                case "Inspection":
                    url = "/Inspection";
                    break;
                case "Accident":
                    url = "/Accident";
                    break;
                case "Maintenance":
                    url = "/Maintenance";
                    break;
                default:
                    return;
            }
            const fullUrl = `/Export${url}`;
            post(fullUrl);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Imports
                </h2>
            }
        >
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <InputLabel htmlFor="Import" value="Import" />
                    <select
                        onChange={(e) =>
                            setData("fileToImport", e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value={""}>choose a table</option>
                        <option value={"cars"}>cars</option>
                        <option value={"users"}>users</option>
                        <option value={"carAssignment"}>car Assignment</option>
                        <option value={"fuel"}>fuel</option>
                        <option value={"Inspection"}>Inspection</option>
                        <option value={"Accident"}>Accident</option>
                    </select>
                    <InputError
                        message={errors.fileToImport}
                        className="mt-2"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                        Note* your csv should end with .xlsx
                    </p>

                    <br />
                    <ImportButton disabled={processing}>Import</ImportButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
