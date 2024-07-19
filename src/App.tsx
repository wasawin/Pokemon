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
      'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0'
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
      <main className=" p-10">
        <h1 className="text-center text-3xl my-4">Pokedex</h1>
        <article
          className="grid grid-cols-2 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 
        ` gap-3 2xl:gap-4"
        >
          {pokemondata.map((pokemon) => {
            return (
              <Link to={`/${pokemon.id}`}>
                <div
                  key={pokemon.id}
                  className={`flex flex-col text-center p-4   border-black border-2 rounded-xl shadow-md hover:bg-slate-300 hover:shadow-${pokemon.types[0].type.name}`}
                >
                  <h4 className="text-end">#{pokemon.id}</h4>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <h2>{pokemon.name}</h2>
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
