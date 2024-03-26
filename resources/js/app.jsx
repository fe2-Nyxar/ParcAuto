import "./bootstrap";
import "../css/app.css";
import store from "./store/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: () => `${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <Provider store={store}>
                    <App {...props} />
                </Provider>
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
