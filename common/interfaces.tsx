export interface IPokemonDetails {
  name?: string;
  stats?: { stat: { name: string }; base_stat: number }[];
  height?: number;
  abilities?: { ability: { name: string } }[];
  image?: string;
  weight?: number;
}

export interface IPokemon {
  name: string;
  url: string;
}
export interface IFormInput {
  title: string;
  value: string;
  type: string;
  errors: string[];
  step: number;
}
export interface IFormProps {
  formInput: IFormInput;
  onSubmit: (inputValue: string) => void;
}

export interface IPaginationProps {
  lastPage: number;
  paginate: (n: number) => void;
  currentPage: number;
}

export interface IPokemonDetailsProps {
  pokemonDetails: IPokemonDetails;
  onClose: () => void;
  isLoading: boolean;
}

export interface IPokemonCardProps {
  onOpen: () => void;
  fetchPokeDetails: (pokeId: string) => void;
  pokemon: IPokemon;
}
