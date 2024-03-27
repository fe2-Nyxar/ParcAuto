import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { ImportButton } from "@/Components/ImportButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UploadInput from "@/Components/UploadInput";
import { useState } from "react";
export default function Import({ auth }) {
    const [url, setUrl] = useState("");

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Imports
                </h2>
            }
        >
            <form method="post" action={`/import/${url}`}>
                <div className="mt-4">
                    <InputLabel htmlFor="Import" value="Import" />
                    <select
                        onChange={(e) => setUrl(e.target.value)}
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
                </div>
                <p className="mt-2 text-sm text-gray-500">
                    Note* your csv should end with .xlsx
                </p>
                <br />
                <UploadInput
                    type="file"
                    change={(e) => set(e.target.files[0])}
                    accept="text/csv"
                />
                <br />
                <ImportButton type="submit">Import</ImportButton>
            </form>
        </AuthenticatedLayout>
    );
}
