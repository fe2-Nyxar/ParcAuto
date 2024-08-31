import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaginationButtons from "@/Components/Pagination ui/PaginationButtons";
import ManipulatePagination from "@/Components/Pagination ui/ManipulatePagination";

export default function Maintenances({ auth, SharedRoutes, MaintenancesData }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Maintenances
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >


            <div className="p-8">
                <ManipulatePagination
                    paginationData={MaintenancesData}
                    Uri={"maintenances"}
                />
                <div className="rounded-t-xl overflow-hidden p-10">
                    <table className="w-full table-auto border-2">
                        <thead>
                            <tr className="bg-gray-600 text-white">
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Immatricule
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    intervention date
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    work preformed
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Quantity
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    location
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {MaintenancesData.data.map((fuel, index) => (
                                <tr className="hover:bg-gray-200" key={index}>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {fuel.Immatricule}
                                    </td>

                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {fuel.intervention_date}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  border-b text-left`}
                                    >
                                        {fuel.work_preformed}
                                    </td>
                                    <td
                                        className={`px-4 py-2  border  border-gray-300  text-left`}
                                    >
                                        {fuel.quantity}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border-b  border-gray-300  text-left`}
                                    >
                                        {fuel.location}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PaginationButtons
                Links={MaintenancesData.links}
            />

        </AuthenticatedLayout>
    );
}
