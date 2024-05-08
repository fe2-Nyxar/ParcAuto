import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Maintenances({ auth, SharedRoutes }) {
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
            <div>Maintenances/boss</div>
        </AuthenticatedLayout>
    );
}
