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

export function PaginationComponent({
  currentPage,
  baseUrl,
}: {
  currentPage: number;

  baseUrl: string;
}) {
  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    router.push(`${baseUrl}&page=${newPage}`);
  };

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <Pagination className="mb-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer text-lg"
            onClick={() => handlePageChange(prevPage)}
          />
        </PaginationItem>

        {prevPage > 0 && (
          <PaginationItem>
            <PaginationLink href={`${baseUrl}&page=${prevPage}`}>
              {prevPage}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href={`${baseUrl}&page=${nextPage}`}>
            {nextPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer text-lg"
            onClick={() => handlePageChange(nextPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
