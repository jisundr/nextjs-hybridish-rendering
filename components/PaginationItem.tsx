import { Button } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  isCurrent?: boolean;
  page: number;
  onPageChange(page: number): void;
};

const PaginationItem: FC<Props> = ({ isCurrent, page, onPageChange }) => {
  if (isCurrent) {
    return (
      <Button size="sm" fontSize="xs" width="4" disabled>
        {page}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.100"
      onClick={() => onPageChange(page)}
      _hover={{
        bg: "gray.300",
      }}
    >
      {page}
    </Button>
  );
};

export default PaginationItem;
