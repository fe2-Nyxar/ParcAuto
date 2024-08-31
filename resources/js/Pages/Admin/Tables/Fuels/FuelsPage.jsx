import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaginationButtons from "@/Components/Pagination ui/PaginationButtons";
import ManipulatePagination from "@/Components/Pagination ui/ManipulatePagination";

const FuelsPage = ({ auth, SharedRoutes, fuelsData }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Fuels
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >
            <div className="p-8">
                <ManipulatePagination
                    paginationData={fuelsData}
                    Uri={"fuels"}
                />
                <div className="rounded-t-xl overflow-hidden p-10">
                    <table className="w-full table-auto border-2">   
                        <thead>
                            <tr className="bg-gray-600 text-white">
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Immatricule
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Onee_id
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Date
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Quantity
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Montant
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Provider
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {fuelsData.data.map((fuel, index) => (
                                <tr className="hover:bg-gray-200" key={index}>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {fuel.ID}
                                    </td>

                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {fuel.Immatricule}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  border-b text-left`}
                                    >
                                        {fuel.Date}
                                    </td>
                                    <td
                                        className={`px-4 py-2  border  border-gray-300  text-left`}
                                    >
                                        {fuel.quantity}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border-b  border-gray-300  text-left`}
                                    >
                                        {fuel.montant}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border border-gray-300 text-left`}
                                    >
                                        {fuel.provider}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PaginationButtons
                Links={fuelsData.links}
            />
        </AuthenticatedLayout>
    );
};

export default FuelsPage;
