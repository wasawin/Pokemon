import axios from 'axios';
import { useEffect, useState } from 'react';
import { Result, Pokemon } from './type/PokemonType';
import { Link } from 'react-router-dom';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemondata, setPokemonData] = useState<Pokemon[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const baseurl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10';
  const fetchPokemonall = async (url: string = baseurl) => {
    setLoading(true);
    const res = await axios.get(`${url}`);
    if (res.data.next) {
      setNext(res.data.next);
    }
    if (res.data.previos) {
      setPrevious(res.data.previos);
    }
    console.log(res.data.previous);

    console.log(res.data.previous);
    console.log(previous);
    console.log(res.data.next);
    console.log(next);

    const detailedPokemon = await Promise.all(
      res.data.results.map(async (pokemon: Result) => {
        const detailResponse = await axios.get(pokemon.url);
        return detailResponse.data;
      })
    );

    // setPokemonData([...pokemondata, ...detailedPokemon]);
    setPokemonData(detailedPokemon);

    setLoading(false);
  };

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
        <article className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 2xl:gap-4">
          {pokemondata.map((pokemon) => {
            return (
              <Link to={`/${pokemon.id}`} key={pokemon.id}>
                <div
                  key={pokemon.id}
                  className={`flex flex-col text-center p-4 bg-white gap-2   border-black border-4 rounded-xl shadow-md  hover:bg-${pokemon.types[0].type.name}`}
                >
                  <h4 className="text-end">
                    #{pokemon.id.toString().padStart(4, '0')}
                  </h4>
                  <img
                    src={
                      pokemon.sprites.other?.['official-artwork'].front_default
                    }
                    alt={pokemon.name}
                  />
                  <h2 className=" sm:text-xl ">{pokemon.name}</h2>
                </div>
              </Link>
            );
          })}
        </article>
        <div className="flex justify-center gap-4 items-center p-2">
          <button
            className={`${previous == null ? 'hidden' : 'bg-red-500'}`}
            onClick={() => fetchPokemonall(previous)}
          >
            Previos{previous}
          </button>
          <button className={``} onClick={() => fetchPokemonall(next)}>
            Next
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
