import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function CarAssignmentsPage({ auth, SharedRoutes }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Car Assignments
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >
            <div>CarAssignments/boss</div>
        </AuthenticatedLayout>
    );
}
