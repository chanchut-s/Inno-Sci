"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
  pageCount: number;
  startDate: string;
  endDate: string;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

const PaginationArrow: React.FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "btn-disabled" : "";

  return (
    <button
      onClick={() => {
        if (!isDisabled) window.location.href = href;
      }}
      className={`btn join-item btn-md ${disabledClassName}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </button>
  );
};

export const PaginationComponent: React.FC<PaginationProps> = ({ pageCount, startDate, endDate }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (pageCount <= 1) {
    return null; //
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, pageCount);

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(5, pageCount);
      } else if (endPage === pageCount) {
        startPage = Math.max(1, pageCount - 4);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="join">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`join-item btn-square ${page === currentPage ? "bg-blue-900 text-white" : "bg-white text-gray-700 hover:bg-gray-300"}`}
          onClick={() => router.push(createPageURL(page))}
        >
          {page}
        </button>
      ))}
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= pageCount}
      />
    </div>
  );
};