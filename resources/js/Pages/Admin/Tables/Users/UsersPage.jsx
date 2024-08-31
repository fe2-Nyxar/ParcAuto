import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaginationButtons from "@/Components/Pagination ui/PaginationButtons";
import ManipulatePagination from "@/Components/Pagination ui/ManipulatePagination";

export default function UsersPage({ auth, SharedRoutes, usersData }) {
    console.log(usersData);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >


            <div className="p-8">
        {<ManipulatePagination
                    paginationData={usersData}
                    Uri={"users"}
                />}
                <div className="rounded-t-xl overflow-hidden p-10">
                    <table className="w-full table-auto border border-2">
                        <thead>
                            <tr className="bg-gray-600 text-white">
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Immatricule
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Onee_id
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    email
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Direction
                                </th>
                                <th className="font-bold px-4 py-2 border-b text-left">
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                  {usersData.data.map((user, index) => (
                                <tr className="hover:bg-gray-200" key={index}>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {user.onee_id}
                                    </td> 

                                    <td
                                        className={`px-4 py-2 border  border-gray-300  text-left`}
                                    >
                                        {user.name}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border  border-gray-300  border-b text-left`}
                                    >
                                        {user.email}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border border-gray-300 text-left`}
                                    >
                                        {user.direction}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border border-gray-300 text-left`}
                                    >
                                        {user.isboss === 1 ? "Admin" : "Employee"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        {  <PaginationButtons
                Links={usersData.links}
            />}

        </AuthenticatedLayout>
    );
}
