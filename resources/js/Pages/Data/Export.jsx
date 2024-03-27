import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { ExportButton } from "@/Components/ExportButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
export default function Export({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        fileToExport: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.fileToExport) {
            setData("fileToExport", "");
            return;
        } else {
            let url = data.fileToExport;

            const fullUrl = `/export/${url}`;
            post(fullUrl);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Exports
                </h2>
            }
        >
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <InputLabel htmlFor="Export" value="Export" />
                    <select
                        onChange={(e) =>
                            setData("fileToExport", e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value={""}>choose a table</option>
                        <option value={"car"}>cars</option>
                        <option value={"user"}>users</option>
                        <option value={"carAssignment"}>car Assignment</option>
                        <option value={"fuel"}>fuel</option>
                        <option value={"maintenance"}>Maintenance</option>
                        <option value={"inspection"}>Inspection</option>
                        <option value={"accident"}>Accident</option>
                    </select>
                    <InputError
                        message={errors.fileToExport}
                        className="mt-2"
                    />
                    <br />
                    <ExportButton disabled={processing}> Export</ExportButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
