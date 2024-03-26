import { Link } from "@inertiajs/react";
export default function CardComponent({
    svgComponent,
    title,
    description,
    url,
}) {
    return (
        <div className="w-full p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10">
            <div className="relative flex flex-col h-full text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                <div className="p-4">
                    <div dangerouslySetInnerHTML={{ __html: svgComponent }} />
                    <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">
                        {title}
                    </h5>
                    <p className="text-base font-light leading-relaxed">
                        {description}
                    </p>
                </div>
                <div className="p-4 pt-0">
                    <Link
                        href={url}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-900 uppercase transition-all bg-gray-100 border border-gray-200 rounded-lg select-none hover:bg-gray-200 active:bg-gray-300"
                    >
                        Visit page
                    </Link>
                </div>
            </div>
        </div>
    );
}
