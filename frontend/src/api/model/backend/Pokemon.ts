export interface PokemonStat {
  stat: { name: string };
  base_stat: number;
}

export interface PokemonAbility {
  ability: { name: string };
}

export interface PokemonType {
  type: PokemonTypeDetail;
}

export interface PokemonTypeDetail {
  name: string;
}

export interface PokemonSprites {
  other: { "official-artwork": { front_default: string } };
}

export interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string }[];
}

export default interface Pokemon {
  id: number;
  name: string;
  url: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  weight: number;
  height: number;
  stats: PokemonStat[];
}
