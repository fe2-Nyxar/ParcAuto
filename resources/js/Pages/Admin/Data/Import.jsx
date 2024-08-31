import InputLabel from "@/Components/Inputs/InputLabel";
import InputError from "@/Components/Inputs/InputError";
import { ImportButton } from "@/Components/Buttons/ImportButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UploadInput from "@/Components/Inputs/UploadInput";
import { useForm, Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import ExpectedHeadersFromTheCsv from "@/Components/ExpectedHeadersFromTheCsv";
import CancelButton from "@/Components/Buttons/CancelButton";
import FormField from "@/Components/FormField";
export default function Import({
    auth,
    SharedRoutes,
    verificationStateMessage,
}) {
    const {
        data,
        setData,
        errors,
        post,
        processing,
        recentlySuccessful,
        cancel,
    } = useForm({
        tableToImport: "",
        fileToImport: "",
    });

    const enable = auth.user.email_verified_at === null;
    const handleSubmit = (e) => {
        e.preventDefault();
        let Table = data.tableToImport;
        if (Table === "" || data.fileToImport === "") {
            setData("tableToImport", "");
            return;
        } else {
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

            const Uri = `/admin/import/${Table}`;
            post(Uri, {
                forceFormData: true,
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
                    Import
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >
            <FormField>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="Import" value="Import Table:" />
                        <select
                            id="Import"
                            onChange={(e) =>
                                setData("tableToImport", e.target.value)
                            }
                            className="w-56 sm:w-60 md:w-72 lg:w-80 xl:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm ml-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
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
                    </div>
                    {!errors.tableToImport ? (
                        <p className="mt-2 ml-3 text-sm text-gray-500">
                            Note* your Excel file should end with .csv
                        </p>
                    ) : (
                        <InputError
                            message={errors.tableToImport}
                            className="mt-2"
                        />
                    )}
                    <br />
                    <InputLabel
                        className="mb-2"
                        htmlFor="ImportFile"
                        value="Select a file:"
                    />
                    <UploadInput
                        id="ImportFile"
                        type="file"
                        accept="text/csv"
                        onChangeCapture={(e) => {
                            setData("fileToImport", e.target.files[0]);
                        }}
                    />
                    <InputError
                        message={errors.fileToImport}
                        className="mt-2"
                    />
                    <br />
                    {(!processing && (
                        <ImportButton
                            disabled={enable || processing}
                            type="submit"
                            className="ml-3"
                        >
                            Import
                        </ImportButton>
                    )) || (
                        <Transition
                            show={processing}
                            enter="transition ease-in-out"
                            enterFrom="opacity-1"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <CancelButton Cancel={cancel} />
                        </Transition>
                    )}
                    <br />
                    <br />

                        {enable &&
                            <Link href="/profile" className="mt-2 text-sm text-red-600" > you should verify your email first!! </Link>
                        }
                </form>
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Data Imported.</p>
                </Transition>

                <br />
                <br />
                <>
                    {data.tableToImport === "user" && (
                        <ExpectedHeadersFromTheCsv
                            headers={[
                                "onee_id",
                                "name",
                                "email",
                                "isboss",
                                "direction",
                                "password",
                            ]}
                        />
                    )}
                    {data.tableToImport === "fuel" && (
                        <ExpectedHeadersFromTheCsv
                            headers={[
                                "Immatricule",
                                "Date",
                                "quantity",
                                "montant",
                                "provider",
                            ]}
                        />
                    )}
                    {data.tableToImport === "car" && (
                        <ExpectedHeadersFromTheCsv
                            headers={[
                                "Immatricule",
                                "type",
                                "license_plate",
                                "Company_provider",
                                "current_kilometers",
                                "max_kilometers",
                                "for_replacing",
                            ]}
                        />
                    )}
                    {data.tableToImport === "carAssignment" && (
                        <ExpectedHeadersFromTheCsv
                            headers={["Immatricule", "onee_id", "ended_at"]}
                        />
                    )}
                    {data.tableToImport === "maintenance" && (
                        <ExpectedHeadersFromTheCsv
                            headers={[
                                "Immatricule",
                                "intervention_date",
                                "work_preformed",
                                "location",
                            ]}
                        />
                    )}
                    {data.tableToImport === "inspection" && (
                        <ExpectedHeadersFromTheCsv
                            headers={["Immatricule", "last_inspection_date"]}
                        />
                    )}
                    {data.tableToImport === "accident" && (
                        <ExpectedHeadersFromTheCsv
                            headers={[
                                "Immatricule",
                                "police_or_amiable",
                                "accident_date",
                                "Damage",
                                "replacement_car_delivery_date",
                                "replacement_vehicle_registration_number",
                                "car_return_date",
                            ]}
                        />
                    )}
                </>

            </FormField>
        </AuthenticatedLayout>
    );
}
