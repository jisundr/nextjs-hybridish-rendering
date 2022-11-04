import { Box, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { usePagination } from "../hooks/usePagination";
import PaginationItem from "./PaginationItem";

type Props = {
  page: number;
  totalCount: number;
  limit: number;
  displayCount?: number;
  onPageChange(page: number): void;
};

const Pagination: FC<Props> = ({
  page,
  totalCount,
  limit,
  displayCount = 1,
  onPageChange,
}) => {
  const { currentPage, previousPages, nextPages, lastPage } = usePagination({
    page,
    totalCount,
    limit,
    displayCount,
  });

  return (
    <HStack mt="8">
      <HStack spacing="4">
        {currentPage > 1 + displayCount ? (
          <>
            <PaginationItem onPageChange={onPageChange} page={1} />
            {currentPage > 2 + displayCount ? (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            ) : null}
          </>
        ) : null}

        {previousPages.length > 0
          ? previousPages.map((item) => {
              return (
                <PaginationItem
                  page={item}
                  key={item}
                  onPageChange={onPageChange}
                />
              );
            })
          : null}

        <PaginationItem
          isCurrent
          page={currentPage}
          onPageChange={onPageChange}
        />

        {nextPages.length > 0
          ? nextPages.map((page) => (
              <PaginationItem
                page={page}
                key={page}
                onPageChange={onPageChange}
              />
            ))
          : null}

        {currentPage + displayCount < lastPage ? (
          <>
            {currentPage + 1 + displayCount < lastPage ? (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            ) : null}
            <PaginationItem onPageChange={onPageChange} page={lastPage} />
          </>
        ) : null}
      </HStack>
    </HStack>
  );
};

export default Pagination;
