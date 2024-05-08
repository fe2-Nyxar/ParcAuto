import AuthenicaredLayout from "@/Layouts/AuthenticatedLayout";
import ManipulatePagination from "@/Components/Pagination ui/ManipulatePagination";
import PaginationButtons from "@/Components/Pagination ui/PaginationButtons";
export default function CarsPage({ auth, SharedRoutes, carsData }) {
    const data = carsData.data.map((Cars, index) => {
        return Cars;
    });
    console.log(data.ID);
    return (
        <AuthenicaredLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Cars
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >
            <div className="p-8">
                <ManipulatePagination paginationData={carsData} Uri={"cars"} />
                <div class="rounded-t-xl overflow-hidden p-10">
                    <table className="w-full table-auto border border-2">
                        <thead>
                            <tr className="bg-gray-600 text-white">
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Immatricule
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Type
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    license Plate
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Company Provider
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    current KM
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Max Kms
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    for replacing
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {carsData.data.map((Cars, index) => (
                                <tr className="hover:bg-gray-200" key={index}>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {Cars.Immatricule}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  border-b text-left`}
                                    >
                                        {Cars.type}
                                    </td>
                                    <td
                                        className={`px-4 py-2  border  border-gray-300  text-left`}
                                    >
                                        {Cars.license_plate}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border-b  border-gray-300  text-left`}
                                    >
                                        {Cars.company_provider}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border border-gray-300 text-left`}
                                    >
                                        {Cars.max_kilometers}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border border-gray-300 text-left`}
                                    >
                                        {Cars.for_replacing}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PaginationButtons
                FirstPage={carsData.first_page_url}
                LastPage={[carsData.last_page, carsData.last_page_url]}
                Links={carsData.links}
            />
        </AuthenicaredLayout>
    );
}
