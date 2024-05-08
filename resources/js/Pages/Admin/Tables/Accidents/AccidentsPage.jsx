import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function AccidentsPage({ auth, SharedRoutes }) {
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
            <div>Accidents/boss</div>
        </AuthenticatedLayout>
    );
}
