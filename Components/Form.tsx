import {
  Container,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { validateInput } from "../common/helpers";
import { IFormInput } from "../common/interfaces";
export default function Form({
  formInput,
  onSubmit,
}: {
  formInput: IFormInput;
  onSubmit: (inputValue: string) => void;
}) {
  const [isFormValid, setIsFormValid] = useState(true);
  const submitForm = () => {
    setIsFormValid(true);

    validateInput(formInput);

    if (formInput.errors.length) {
      setIsFormValid(false);
      return;
    }

    onSubmit(formInput.value);
  };

  return (
    <Container pt={20} justifyContent="center">
      <Flex
        boxShadow="xl"
        p={5}
        maxW="2xl"
        bg="white"
        color="black"
        rounded={6}
        h="32h"
        wrap="wrap"
      >
        {formInput.step === 1 && (
          <Box w="100%" mb="2">
            <Heading color="blue.900" mb="2">
              Welcome to PokeDex!
            </Heading>
            <Text color="blue.900">Please enter your details to proceed</Text>
          </Box>
        )}
        <FormControl isInvalid={!isFormValid}>
          <FormLabel>{formInput.title}</FormLabel>
          {formInput.type === "date" ? (
            <Input
              onChange={(e) => (formInput.value = e.target.value)}
              type="date"
              max="2022-01-01"
            />
          ) : (
            <Input
              type={formInput.type}
              onChange={(e) => (formInput.value = e.target.value)}
            />
          )}
          {formInput.errors.length
            ? formInput.errors.map((error: string, idx) => (
                <FormErrorMessage key={idx}>{error}</FormErrorMessage>
              ))
            : ""}
          <Flex justifyContent="center">
            <Button onClick={submitForm} m={10}>
              {formInput.step === 1 ? "Next" : "Finish"}
            </Button>
          </Flex>
        </FormControl>
      </Flex>
    </Container>
  );
}
