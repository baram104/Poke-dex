import { Button, Flex } from "@chakra-ui/react";
import React from "react";

export default function Pagination({
  lastPage,
  paginate,
  currentPage,
}: {
  lastPage: number;
  paginate: (n: number) => void;
  currentPage: number;
}) {
  return (
    <Flex justify="center" alignItems="baseline">
      {currentPage > 1 && (
        <Button
          mr="2"
          colorScheme="telegram"
          onClick={() => paginate(currentPage - 1)}
        >
          {"<"}
        </Button>
      )}
      {currentPage > 1 && (
        <Button
          colorScheme="telegram"
          onClick={() => paginate(currentPage - 1)}
        >
          {currentPage - 1}
        </Button>
      )}
      <Button
        size="lg"
        colorScheme="facebook"
        cursor="default"
        mx="5"
        onClick={() => paginate(currentPage)}
      >
        {currentPage}
      </Button>
      {currentPage < lastPage && (
        <Button
          colorScheme="telegram"
          onClick={() => paginate(currentPage + 1)}
        >
          {currentPage + 1}
        </Button>
      )}
      {currentPage < lastPage && (
        <Button
          ml="2"
          colorScheme="telegram"
          onClick={() => paginate(currentPage + 1)}
        >
          {">"}
        </Button>
      )}
    </Flex>
  );
}
