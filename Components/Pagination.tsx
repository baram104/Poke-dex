import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { IPaginationProps } from "../common/interfaces";

export default function Pagination({
  lastPage,
  paginate,
  currentPage,
}: IPaginationProps) {
  return (
    <Flex justify="center" alignItems="baseline">
      {currentPage > 1 && (
        <>
          <Button
            mr="2"
            colorScheme="telegram"
            onClick={() => paginate(currentPage - 1)}
          >
            {"<"}
          </Button>
          <Button
            colorScheme="telegram"
            onClick={() => paginate(currentPage - 1)}
          >
            {currentPage - 1}
          </Button>
        </>
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
        <>
          <Button
            colorScheme="telegram"
            onClick={() => paginate(currentPage + 1)}
          >
            {currentPage + 1}
          </Button>
          <Button
            ml="2"
            colorScheme="telegram"
            onClick={() => paginate(currentPage + 1)}
          >
            {">"}
          </Button>
        </>
      )}
    </Flex>
  );
}
