import axios from 'axios';
import { useEffect, useState } from 'react';
import { Result, Pokemon } from './type/PokemonType';
import { Link } from 'react-router-dom';

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
  const [loading, setLoading] = useState(true);
  const [pokemondata, setPokemonData] = useState<Pokemon[]>([]);

  const fetchPokemonall = async () => {
    const res = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0'
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

  console.log(pokemondata);

  useEffect(() => {
    fetchPokemonall();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <main className=" p-3 sm:p-10 overflow-y-auto bg-Primary">
        <h1 className="text-center text-3xl text-white font-bold my-4">
          Pokedex
        </h1>
        <article className="grid grid-cols-2 lg:grid-cols-5 gap-3 2xl:gap-4">
          {pokemondata.map((pokemon) => {
            return (
              <Link to={`/${pokemon.id}`}>
                <div
                  key={pokemon.id}
                  className={`flex flex-col text-center p-4 bg-white gap-2   border-black border-4 rounded-xl shadow-md hover:bg-slate-300 hover:shadow-${pokemon.types[0].type.name}`}
                >
                  <h4 className="text-end">#{pokemon.id}</h4>
                  <img
                    key={pokemon.name + pokemon.id}
                    src={
                      pokemon.sprites.other?.['official-artwork'].front_default
                    }
                    alt={pokemon.name}
                  />
                  <h2 className=" sm:text-xl">{pokemon.name}</h2>
                </div>
              </Link>
            );
          })}
        </article>
      </main>
    </>
  );
}

export default App;
