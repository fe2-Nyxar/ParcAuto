import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/Links/NavLink";
import ResponsiveNavLink from "@/Components/Links/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Footer from "@/Components/Footer";

export default function Authenticated({
    user,
    header,
    children,
    SharedRoutes,
}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href={route(SharedRoutes.dashboard)}>
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        preserveScroll
                                        href={route("dashboard.admin")}
                                        active={route().current(
                                            SharedRoutes.dashboard
                                        )}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        preserveScroll
                                        href={route(SharedRoutes.createuser)}
                                        active={route().current(
                                            SharedRoutes.createuser
                                        )}
                                    >
                                        Create User
                                    </NavLink>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <button className="mx-5">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: NotificationSvg,
                                        }}
                                    />
                                </button>
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    <div
                                                        className="flex justify-center m-0
"
                                                        dangerouslySetInnerHTML={{
                                                            __html: SettingsSvg,
                                                        }}
                                                    />
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Logout
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard.admin")}
                                active={route().current("dashboard.admin")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("createuser")}
                                active={route().current("createuser")}
                            >
                                Create User
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
}
const SettingsSvg = `<svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>.cls-1,.cls-2{fill:none;stroke:#000000;strokeLinecap:round;strokeLinejoin:bevel;strokeWidth:1.5px;}.cls-1{fill-rule:evenodd;}</style>
  </defs>
  <g id="ic-actions-settings">
    <path class="cls-1" d="M10.42969,3.386l.08732-.2153a1.98122,1.98122,0,0,1,3.72985.16285l.06823.22209a1.98121,1.98121,0,0,0,2.66558,1.243l.214-.09049a1.98122,1.98122,0,0,1,2.52226,2.75255l-.10881.20528A1.98122,1.98122,0,0,0,20.614,10.42969l.2153.08732a1.98122,1.98122,0,0,1-.16285,3.72985l-.22209.06823a1.98121,1.98121,0,0,0-1.243,2.66558l.09049.214a1.98122,1.98122,0,0,1-2.75255,2.52226l-.20528-.10881A1.98122,1.98122,0,0,0,13.57031,20.614l-.08732.2153a1.98122,1.98122,0,0,1-3.72985-.16285l-.06823-.22209a1.98121,1.98121,0,0,0-2.66558-1.243l-.214.09049a1.98122,1.98122,0,0,1-2.52226-2.75255l.10881-.20528A1.98122,1.98122,0,0,0,3.386,13.57031l-.2153-.08732a1.98122,1.98122,0,0,1,.16285-3.72985l.22209-.06823a1.98121,1.98121,0,0,0,1.243-2.66558l-.09049-.214A1.98122,1.98122,0,0,1,7.46064,4.28309l.20528.10881A1.98122,1.98122,0,0,0,10.42969,3.386Z"/>
    <circle class="cls-2" cx="12" cy="12" r="3.90957"/>
  </g>
</svg>`;

const NotificationSvg = `<svg fill="#000000" height="20" width="20" 
version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 611.999 611.999" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier"
 stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
 <g> <g> <g> <path d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203 
 C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578 c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626 h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856 c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626 C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32 c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082 c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826 c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485 c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z">
 </path> <path d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258 c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258 C323.259,126.96,315.532,119.235,306.001,119.235z">
 </path> </g> </g> </g> </g></svg>`;
