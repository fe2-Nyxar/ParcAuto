import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import CustomizableButton from "@/Components/Buttons/CustomizableButton";
import { Transition } from "@headlessui/react";

export default function Edit({ auth, SharedRoutes, status }) {
    const [isVerified, setIsVerified] = useState(false);
    const { post, processing, recentlySuccessful } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };
    console.log(status);

    useEffect(() => {
        if (auth.user.email_verified_at === null) {
            setIsVerified(false);
        } else if (auth.user.email_verified_at !== null) {
            setIsVerified(true);
        }
    }, [auth.user]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {!isVerified && (
                        <form onSubmit={submit}>
                            <div>
                                <CustomizableButton
                                    type={"submit"}
                                    disabled={processing}
                                    className=" select-none text-green-500 border border-green-500 hover:bg-green-500 hover:text-white py-2 px-4 rounded inline-block transition duration-300"
                                >
                                    Verify email
                                </CustomizableButton>
                            </div>
                        </form>
                    )}
                    {!isVerified && status === "verification-link-sent" && (
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-1"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                            className={"text-purple-600"}
                        >
                            <div className="mb-4 font-medium text-sm text-green-600">
                                A verification email link has been sent. Check
                                your Inbox!!
                            </div>
                        </Transition>
                    )}

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            isVerified={isVerified}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
