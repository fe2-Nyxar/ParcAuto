import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaginationButtons from "@/Components/Pagination ui/PaginationButtons";
import ManipulatePagination from "@/Components/Pagination ui/ManipulatePagination";


export default function AccidentsPage({ auth, SharedRoutes, accidentsData }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Accidents
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >

            <div className="p-8">
                <ManipulatePagination
                    paginationData={accidentsData}
                    Uri={"accidents"}
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
                                    police or amiable
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    accident date
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    damage
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    replacement car date
                                </th>

                                <th className="font-bold px-4 py-2 border-b text-left">
                                    replacement vehicle registration number                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    car return date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accidentsData.data.map((fuel, index) => (
                                <tr className="hover:bg-gray-200" key={index}>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {fuel.Immatricule}
                                    </td>

                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {fuel.onee_id}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  border-b text-left`}
                                    >
                                        {fuel.police_or_amiable}
                                    </td>
                                    <td
                                        className={`px-4 py-2  border  border-gray-300  text-left`}
                                    >
                                        {fuel.accident}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border-b  border-gray-300  text-left`}
                                    >
                                        {fuel.Damage}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border border-gray-300 text-left`}
                                    >
                                        {fuel.replacement_car_delivery_date}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border border-gray-300 text-left`}
                                    >
                                        {fuel.car_return_date}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PaginationButtons
                Links={accidentsData.links}
            />
        </AuthenticatedLayout>
    );
}
