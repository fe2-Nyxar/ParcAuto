import InputLabel from "@/Components/Inputs/InputLabel";
import InputError from "@/Components/Inputs/InputError";
import { ExportButton } from "@/Components/Buttons/ExportButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import CancelButton from "@/Components/Buttons/CancelButton";
import FormField from "@/Components/FormField";

export default function Export({ auth, SharedRoutes }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        cancel,
    } = useForm({
        tableToExport: "",
    });
    console.log(auth.user.email_verified_at === null ? 0 : 1);
    const verified = auth.user.email_verified_at === null ? 0 : 1;
    const enable = verified === 0 || processing;
    const handleSubmit = (e) => {
        e.preventDefault();
        let Table = data.tableToExport;
        Table =
            Table === "car"
                ? "car"
                : Table === "user"
                ? "user"
                : Table === "carAssignment"
                ? "carAssignment"
                : Table === "fuel"
                ? "fuel"
                : Table === "maintenance"
                ? "maintenance"
                : Table === "inspection"
                ? "inspection"
                : Table === "accident"
                ? "accident"
                : "";

        if (!Table) {
            setData("tableToExport", "");
            return;
        } else {
            const Uri = `/admin/export/${Table}`;
            post(Uri, {
                preserveScroll: true,
                errorBag: "default",
                onSuccess: (result) => {
                    console.log(result);
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
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
            SharedRoutes={SharedRoutes}
        >
            <FormField>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="Export" value="Export" />
                        <select
                            id="Export"
                            onChange={(e) =>
                                setData("tableToExport", e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value={""}>choose a table</option>
                            <option value={"car"}>cars</option>
                            <option value={"user"}>users</option>
                            <option value={"carAssignment"}>
                                car Assignment
                            </option>
                            <option value={"fuel"}>fuel</option>
                            <option value={"maintenance"}>Maintenance</option>
                            <option value={"inspection"}>Inspection</option>
                            <option value={"accident"}>Accident</option>
                        </select>
                        <InputError
                            message={errors.tableToExport}
                            className="mt-2"
                        />
                        <br />
                        {(!processing && (
                            <ExportButton className="ml-3" disabled={enable}>
                                Export
                            </ExportButton>
                        )) || (
                            <Transition
                                show={processing}
                                enter="transition ease-in-out"
                                enterFrom="opacity-1"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                                className={"text-purple-600"}
                            >
                                <CancelButton
                                    Cancel={cancel}
                                    processing={processing}
                                />
                            </Transition>
                        )}
        {!verified && 
                           <Link href="/profile" className="mt-2 text-sm text-red-600" > you should verify your email first!! </Link>
} 
        </div>
                </form>
                {!errors.tableToExport && (
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-1"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                        className={"text-purple-600"}
                    >
                        <p className="mt-2 text-sm text-red-600 ">
                            Table is empty...
                        </p>
                    </Transition>
                )}
            </FormField>
        </AuthenticatedLayout>
    );
}
