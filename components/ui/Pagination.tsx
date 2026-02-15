import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    // Generate page numbers to display
    // Simple logic: Show all if small, or sliding window if large. 
    // For now, let's keep it simple as requested: "Previous 1 2 3 ... 27 Next"

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always include 1
            pages.push(1);

            // Logic to show pages around current
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                end = 4;
            }
            if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
            }

            if (start > 2) {
                pages.push("...");
            }

            for (let i = start; i <= end; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }

            if (end < totalPages - 1) {
                pages.push("...");
            }

            // Always include last
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-4 mt-12 mb-8 font-medium text-gray-500">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 hover:text-[#022c75] disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
            >
                <ChevronLeft size={16} />
                Previous
            </button>

            <div className="flex items-center gap-2">
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === "..." ? (
                            <span className="px-2">--</span> // Matches user image "--" style
                        ) : (
                            <button
                                onClick={() => onPageChange(page as number)}
                                className={`
                            px-2 py-1 relative transition-colors
                            ${currentPage === page ? "text-[#00b0b9] font-bold" : "hover:text-[#022c75]"}
                        `}
                            >
                                {page}
                                {currentPage === page && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00b0b9]" />
                                )}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 hover:text-[#022c75] disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
            >
                Next
                <ChevronRight size={16} />
            </button>
        </div>
    );
}
