import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/Inputs/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
export default function UpdateProfileInformation({
    isVerified,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            email: user.email,
        });
    const submit = (e) => {
        e.preventDefault();
        console.log(data, isVerified);
        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="Name" value="Name" />

                    <TextInput
                        id="Name"
                        className="mt-1 block w-full"
                        value={user.name}
                        required
                        disabled={true}
                        isFocused
                        autoComplete="name"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="onee_id" value="Onee ID" />

                    <TextInput
                        id="oneeid"
                        className="mt-1 block w-full"
                        value={user.onee_id}
                        required
                        disabled={true}
                        isFocused
                        autoComplete="name"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="Role" value="Role" />

                    <TextInput
                        id="Role"
                        className="mt-1 block w-full"
                        value={user.isboss === 0 ? "Employee" : "Admin"}
                        required
                        disabled={true}
                        isFocused
                        autoComplete="name"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {!isVerified && (
                    <div>
                        <p className="text-sm mt-2 text-red-600/100">
                            Your email address is unverified.
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
