import PaginationLinks from "./PaginationLinks";
export default function PaginationButtons({ Links }) {
    return (
        <>
            <div
                aria-label="Page navigation example"
                className="flex justify-center"
            >
                <ul className="flex items-center -space-x-px h-10 text-base mb-10 mt-5">
                    {Links.map((link, index) => (
                        <PaginationLinks
                            active={link.active}
                            key={index}
                            disabled={link.active}
                            href={link.url}
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        </PaginationLinks>
                    ))}
                </ul>
            </div>
        </>
    );
}
