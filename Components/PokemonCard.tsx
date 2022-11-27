import {
  Card,
  CardBody,
  Center,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { computePokeId, computePokeImgSrc } from "../common/helpers";
import { IPokemon } from "../common/interfaces";

export default function PokemonCard({
  onOpen,
  fetchPokeDetails,
  pokemon,
}: {
  onOpen: () => void;
  fetchPokeDetails: (pokeId: string) => void;
  pokemon: IPokemon;
}) {
  return (
    <Card
      w={[
        "70%", // 0-30em
        "70%", // 30em-48em
        "50%", // 48em-62em
        "30%", // 62em+
        "25%",
        "20%",
      ]}
      className="poke-card"
      maxW="lg"
      bg="white"
      boxShadow="xl"
      mb={6}
      mx={1}
      rounded={12}
      onClick={() => {
        onOpen();
        fetchPokeDetails(computePokeId(pokemon.url));
      }}
      key={pokemon.name}
    >
      <CardBody p={3}>
        <Center
          bgImage={"/poke-bg.png"}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="100%"
        >
          <Image
            onError={(e) => {
              e.currentTarget.src = "/pokeball.svg.png";
            }}
            src={computePokeImgSrc(computePokeId(pokemon.url))}
            alt={pokemon.name + " img"}
            borderRadius="lg"
            w="100%"
          />
        </Center>
        <Stack w="100%" mt="6" spacing="3">
          <Heading size="sm" textAlign="center" as="i">
            {pokemon.name}
          </Heading>
        </Stack>
      </CardBody>
    </Card>
  );
}
