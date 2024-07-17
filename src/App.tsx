import axios from 'axios';
import { useEffect, useState } from 'react';
import { Result, Pokemon } from './type/PokemonType';

function App() {
  const [pokemondata, setPokemonData] = useState<Pokemon[]>([]);

  const fetchPokemonall = async () => {
    const res = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=6&offset=0'
    );
    const detailedPokemon = await Promise.all(
      res.data.results.map(async (pokemon: Result) => {
        const detailResponse = await axios.get(pokemon.url);
        return detailResponse.data;
      })
    );
    setPokemonData(detailedPokemon);
  };

  // console.log(pokemondata);

  useEffect(() => {
    fetchPokemonall();
  }, []);

  return (
    <>
      <h1 className="text-center text-3xl">Pokedex</h1>
      <article className="flex bg-red-200">
        {pokemondata.map((pokemon) => (
          <div key={pokemon.id} className="flex flex-col text-center p-4">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <p>ส่วนสูง: {pokemon.height}</p>
            <p>น้ำหนัก: {pokemon.weight}</p>
          </div>
        ))}
      </article>
    </>
  );
}

export default App;
