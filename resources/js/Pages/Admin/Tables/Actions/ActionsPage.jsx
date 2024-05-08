import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ActionsOnTables({ auth, SharedRoutes }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Accident
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >
            ActionsOnTables
        </AuthenticatedLayout>
    );
}
