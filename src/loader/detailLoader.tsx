import axios from 'axios';
import { Pokemon } from '../type/PokemonType';
import { LoaderFunctionArgs } from 'react-router-dom';

export const detailLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<Pokemon> => {
  const result = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
  );
  if (!result.data) {
    throw new Response('No pokemon found', { status: 404 });
  }
  const pokemondetail = result.data;
  return pokemondetail;
};
