import axios from 'axios';
import { useEffect, useState } from 'react';
import { Result, Pokemon } from './type/PokemonType';

function Loading() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-white ">
        Loading...
      </div>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const [pokemondata, setPokemonData] = useState<Pokemon[]>([]);

  const fetchPokemonall = async () => {
    setLoading(true);
    const res = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=60&offset=0'
    );
    const detailedPokemon = await Promise.all(
      res.data.results.map(async (pokemon: Result) => {
        const detailResponse = await axios.get(pokemon.url);
        return detailResponse.data;
      })
    );
    setPokemonData(detailedPokemon);
    setLoading(false);
  };

  // console.log(pokemondata);

  useEffect(() => {
    fetchPokemonall();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <main className=" bg-red-200   p-10">
        <h1 className="text-center text-3xl my-4">Pokedex</h1>
        <article className="flex flex-wrap justify-center items-center gap-2 ">
          {pokemondata.map((pokemon) => (
            <div
              key={pokemon.id}
              className="flex flex-col text-center p-4 hover:bg-white border-black border-2 rounded-xl"
            >
              <h4 className="text-end">#{pokemon.id}</h4>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h2>{pokemon.name}</h2>
            </div>
          ))}
        </article>
      </main>
    </>
  );
}

export default App;
