import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaginationButtons from "@/Components/Pagination ui/PaginationButtons";
import ManipulatePagination from "@/Components/Pagination ui/ManipulatePagination";

export default function CarAssignmentsPage({ auth, SharedRoutes, carassignData }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Car Assignments
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >


            <div className="p-8">
                <ManipulatePagination
                    paginationData={carassignData}
                    Uri={"carAssignment"}
                />
                <div className="rounded-t-xl overflow-hidden p-10">
                    <table className="w-full table-auto border border-2">
                        <thead>
                            <tr className="bg-gray-600 text-white">
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    assignment_id
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Immatricule
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    onee_id
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {carassignData.data.map((fuel, index) => (
                                <tr className="hover:bg-gray-200" key={index}>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {fuel.assignment_id}
                                    </td>

                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {fuel.Immatricule}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  border-b text-left`}
                                    >
                                        {fuel.onee_id}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PaginationButtons
                Links={carassignData.links}
            />

        </AuthenticatedLayout>
    );
}
