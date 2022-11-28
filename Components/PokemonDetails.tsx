import {
  Container,
  Flex,
  Image,
  Box,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { IPokemonDetailsProps } from "../common/interfaces";

export default function PokemonDetails({
  pokemonDetails,
  onClose,
  isLoading,
}: IPokemonDetailsProps) {
  if (!pokemonDetails.name) return null;
  return (
    <>
      <ModalOverlay />
      <ModalContent rounded={10} boxShadow="dark-lg">
        <ModalCloseButton />
        {!isLoading ? (
          <ModalBody p={3}>
            <Flex justifyContent="center" wrap="wrap">
              <Flex
                w="100%"
                justify="center"
                bgImage={"/poke-bg.png"}
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="100%"
                rounded={8}
              >
                <Image
                  src={
                    pokemonDetails.image
                      ? pokemonDetails.image
                      : "/pokeball.svg.png"
                  }
                  alt={pokemonDetails.name}
                  w="60%"
                ></Image>
              </Flex>
              <Box>
                <Text fontSize="3xl" as="b">
                  {pokemonDetails.name.toUpperCase()}
                </Text>
              </Box>
            </Flex>
            {pokemonDetails.stats
              ? pokemonDetails.stats.map((stat, idx) => (
                  <Flex key={idx} justifyContent="space-between" mb={2}>
                    <Box>
                      <Image
                        src={`/${stat.stat.name}.png`}
                        alt={stat.stat.name}
                      ></Image>
                    </Box>
                    <Box textAlign="start" w="80%">
                      <Text fontSize="xl">
                        {stat.stat.name[0].toUpperCase() +
                          stat.stat.name.slice(1)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="xl">{stat.base_stat}</Text>
                    </Box>
                  </Flex>
                ))
              : null}

            <Container justifyContent="center">
              <Container bg="blue.100" rounded={6} w="90%" my={7} p={3}>
                <Flex textAlign="center" w="100%">
                  <Box w="50%">
                    <Text fontSize="2xl">WEIGHT</Text>
                  </Box>
                  <Box w="50%">
                    <Text fontSize="2xl">{pokemonDetails.weight}</Text>
                  </Box>
                </Flex>
                <Flex textAlign="center" w="100%">
                  <Box w="50%">
                    <Text fontSize="2xl">HEIGHT</Text>
                  </Box>
                  <Box w="50%">
                    <Text fontSize="2xl">{pokemonDetails.height}</Text>
                  </Box>
                </Flex>
              </Container>

              <Container bg="blue.100" rounded={6} w="90%">
                <Flex textAlign="center" w="100%" wrap="wrap" p={3}>
                  <Flex
                    w="100%"
                    textAlign="center"
                    justifyContent="space-around"
                  >
                    <Text fontSize="3xl" color="blue.900" as="b">
                      ABILITIES
                    </Text>
                  </Flex>
                  {pokemonDetails.abilities &&
                    pokemonDetails.abilities.map(({ ability }, idx) => (
                      <Box w="100%" key={idx}>
                        <Text fontSize="2xl" as="i">
                          {ability.name[0].toUpperCase() +
                            ability.name.slice(1)}
                        </Text>
                      </Box>
                    ))}
                </Flex>
              </Container>
            </Container>
          </ModalBody>
        ) : (
          <Flex justify="center">
            <Spinner p={5} />
          </Flex>
        )}
        <ModalFooter justifyContent="center">
          <Button
            fontSize="xl"
            colorScheme="blue"
            rounded={8}
            w="50%"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
