import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/Inputs/TextInput";
import PasswordInput from "@/Components/Inputs/PasswordInput";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import GoBackButton from "@/Components/Buttons/GoBackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectInput from "@/Components/Inputs/SelectInput";
export default function CreateUser(
    { auth, SharedRoutes }
) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        oneeid: "",
        name: "",
        email: "",
        role: "",
        direction: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("createuser"), {
            preserveScroll: true,
        });
    };

    return (
         <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create a user
                </h2>
            }
            SharedRoutes={SharedRoutes}
        >
        <div>
            <br />
            <br />
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <Head title="Register" />
                    {/* <GoBackButton /> */}
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-1"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                        className={"text-purple-600"}
                    >
                        <p className="mt-2 text-sm text-green-600 ">
                            user is created succeefully!
                        </p>
                    </Transition>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="oneeid" value="Onee ID" />

                            <TextInput
                                id="oneeid"
                                name="oneeid"
                                value={data.oneeid}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("oneeid", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.oneeid}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="role" value="Role" />

                            <SelectInput
                                id="role"
                                Change={(e) => setData("role", e.target.value)}
                                className="block w-full p-2.5"
                                DefOptions={{ "choose an option": "" }}
                                Options={{
                                    0: "Employee",
                                    1: "Boss",
                                }}
                            />

                            <InputError
                                message={errors.role}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="direction" value="Direction" />

                            <SelectInput
                                id="direction"
                                Change={(e) =>
                                    setData("direction", e.target.value)
                                }
                                className="block w-full p-2.5"
                                DefOptions={{ "choose an option": "" }}
                                Options={{
                                    DPF: "DPF",
                                    DPM: "DPM",
                                    DPT: "DPT",
                                }}
                            />

                            <InputError
                                message={errors.direction}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <PasswordInput
                                id="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Create
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
     </AuthenticatedLayout>
    );
}
