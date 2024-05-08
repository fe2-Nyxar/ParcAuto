import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function UsersPage({ auth, SharedRoutes }) {
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
            <div>Users/boss</div>
        </AuthenticatedLayout>
    );
}
