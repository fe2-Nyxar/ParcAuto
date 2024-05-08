import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaginationButtons from "@/Components/Pagination ui/PaginationButtons";
import ManipulatePagination from "@/Components/Pagination ui/ManipulatePagination";
export default function Inspections({ auth, SharedRoutes, InspectionData }) {
    // const inspectionItems = InspectionData.data.map(
    //     (item) => item.daysBetweenInspections
    // );
    console.log(InspectionData);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Inspections
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >
            <div className="p-8">
                <ManipulatePagination
                    paginationData={InspectionData}
                    Uri={"inspections"}
                />
                <div className="rounded-t-xl overflow-hidden p-10">
                    <table className="w-full table-auto border border-2">
                        <thead className="select-none">
                            <tr className="bg-gray-600 text-white ">
                                <th className="font-bold px-4 py-2 border-b text-left ">
                                    ID
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Immatricule
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Previous Inspection
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Next Inspection
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    days Between Inspections
                                </th>
                            </tr>
                        </thead>
                        <tbody className="select-none">
                            {InspectionData.data.map((inspection, index) => (
                                <tr
                                    className={`hover:bg-stone-200 ${
                                        inspection.stages.stg1
                                            ? "bg-yellow-200"
                                            : ""
                                    } ${
                                        inspection.stages.stg2
                                            ? "bg-orange-200"
                                            : ""
                                    } 
                            ${inspection.stages.stg3 ? "bg-red-200" : ""}
                            ${
                                inspection.stages.stg4
                                    ? "bg-gray-200 line-through text-gray-500"
                                    : ""
                            } `}
                                    key={index}
                                >
                                    <td
                                        className={`px-4 py-2 border  border-gray-300   border-b text-left`}
                                    >
                                        {inspection.ID}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300   border-b text-left`}
                                    >
                                        {inspection.Immatricule}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300   border-b text-left  
                                    `}
                                    >
                                        {inspection.previous}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300   border-b text-left`}
                                    >
                                        {inspection.next}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300   border-b text-left`}
                                    >
                                        {(inspection.stages.stg4 &&
                                            ` -${inspection.daysBetweenInspections} passed `) ||
                                            `${inspection.daysBetweenInspections} left `}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PaginationButtons Links={InspectionData.links} />
            </div>
        </AuthenticatedLayout>
    );
}
