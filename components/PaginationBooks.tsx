"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function PaginationBooks({
  currentPage,
  baseUrl,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      router.push(`${baseUrl}&page=${newPage}`);
    });
  };

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <Pagination className="mb-10">
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              className="text-lg"
              onClick={() => handlePageChange(prevPage)}
            />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            className="bg-[#1e2531] text-white border-none"
            href="#"
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext
              className=" text-lg"
              onClick={() => handlePageChange(nextPage)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
