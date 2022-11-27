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
  validations: {
    required: boolean;
    pattern?: { regex: RegExp; errorMsg: string };
  };
  type: string;
  errors: string[];
  step: number;
}
