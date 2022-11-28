import { useEffect, useState } from "react";

import { Container, Flex, Modal, useDisclosure, Input } from "@chakra-ui/react";
import PokemonDetails from "../Components/PokemonDetails";
import Pagination from "../Components/Pagination";
import React from "react";
import { useRouter } from "next/router";
import { checkLocalStorageUserInfo } from "../common/helpers";
import PokemonCard from "../Components/PokemonCard";
import { IPokemonDetails, IPokemon } from "../common/interfaces";
import { POKEMONS_PER_PAGE, POKE_DETAILS_URL } from "../common/constants";

export async function getStaticProps() {
  let res, data;
  try {
    res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1154");
    data = await res.json();
  } catch (error) {
    return {
      props: { pokemons: [] },
    };
  }
  return {
    props: {
      pokemons: data.results,
    },
  };
}

export default function Pokemons(props: { pokemons: IPokemon[] }) {
  const router = useRouter();

  const [pokemons, setPokemons] = useState(props.pokemons);
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails>({});
  const [isPokemonDetailsLoading, setIsPokemonDetailsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const indexOfLastPokemon = currentPage * POKEMONS_PER_PAGE;
  const indexOfFirstPokemon = indexOfLastPokemon - POKEMONS_PER_PAGE;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    checkLocalStorageUserInfo(router);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    if (searchInput) {
      setPokemons(
        props.pokemons.filter((pokemon) => pokemon.name.includes(searchInput))
      );
    } else {
      setPokemons(props.pokemons);
    }
  }, [searchInput]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchPokeDetails = async (id: string) => {
    setIsPokemonDetailsLoading(true);
    let res, data;
    try {
      res = await fetch(`${POKE_DETAILS_URL}${id}/`);
      data = await res.json();
    } catch (error) {
      console.log(error);
    }

    setPokemonDetails({
      name: data.name,
      stats: data.stats,
      height: data.height,
      abilities: data.abilities,
      image: data.sprites.front_default,
      weight: data.weight,
    });
    setIsPokemonDetailsLoading(false);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container pt={20} justifyContent="space-between" maxW="70%" mb={10}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <PokemonDetails
          pokemonDetails={pokemonDetails}
          isLoading={isPokemonDetailsLoading}
          onClose={onClose}
        ></PokemonDetails>
      </Modal>
      <Container mb={10}>
        <Input
          placeholder="Search Pokemons"
          bg="white"
          mb="2"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Container>

      <Flex color="black" rounded={6} wrap="wrap" justifyContent="space-around">
        {currentPokemons?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            fetchPokeDetails={fetchPokeDetails}
            onOpen={onOpen}
            pokemon={pokemon}
          ></PokemonCard>
        ))}
      </Flex>
      <Pagination
        paginate={paginate}
        currentPage={currentPage}
        lastPage={Math.ceil(pokemons.length / POKEMONS_PER_PAGE)}
      ></Pagination>
    </Container>
  );
}
