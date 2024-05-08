import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Fuels({ auth, SharedRoutes }) {
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
            <div>Fuels/employee</div>
        </AuthenticatedLayout>
    );
}
