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
import React, { useRef } from "react";
import { useState } from "react";
import { IFormProps } from "../common/interfaces";
export default function Form({ formInput, onSubmit }: IFormProps) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isInputTouched, setIsInputTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateInput = (value: string | undefined) => {
    setIsInputTouched(true);
    if (value) {
      setIsFormValid(true);
      return true;
    } else {
      setIsFormValid(false);
      return false;
    }
  };

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    validateInput(e.currentTarget.value);
  };

  const submitForm = () => {
    if (!inputRef.current) return;
    if (!validateInput(inputRef.current?.value)) return;
    onSubmit(inputRef.current.value);
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
        <FormControl isInvalid={!isFormValid && isInputTouched}>
          <FormLabel>{formInput.title}</FormLabel>
          {formInput.type === "date" ? (
            <Input
              onChange={onInputChange}
              type="date"
              max="2022-01-01"
              ref={inputRef}
            />
          ) : (
            <Input
              type={formInput.type}
              onChange={onInputChange}
              ref={inputRef}
            />
          )}
          {!isFormValid && isInputTouched && (
            <FormErrorMessage>Please enter a value</FormErrorMessage>
          )}
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
