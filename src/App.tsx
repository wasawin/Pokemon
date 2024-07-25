import axios from 'axios';
import { useEffect, useState } from 'react';
import { Result, Pokemon } from './type/PokemonType';
import { Link, useSearchParams } from 'react-router-dom';
import Loading from './components/Loading';
import question from './assets/question.png';

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemondata, setPokemonData] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = searchParams.get('offset') || '0';
  const limit = searchParams.get('limit') || '40';
  const fetchPokemonall = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
      );
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      const detailedPokemon = await Promise.all(
        res.data.results.map(async (pokemon: Result) => {
          const detailResponse = await axios.get(pokemon.url);
          return detailResponse.data;
        })
      );
      setPokemonData(detailedPokemon);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPokemonall();
  }, [offset, limit]);

  function handleNextPage() {
    if (nextUrl) {
      const params = new URLSearchParams(new URL(nextUrl).search);
      setSearchParams(params);
    }
  }

  function handlePrevPage() {
    if (prevUrl) {
      const params = new URLSearchParams(new URL(prevUrl).search);
      setSearchParams(params);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="min-h-screen p-3 sm:p-10 overflow-y-auto bg-Primary">
          <h1 className="text-center text-3xl text-white font-bold my-4 cursor-pointer hover:text-black hover:drop-shadow-sm ">
            <Link to="">PokeDex</Link>
          </h1>
          <article className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 2xl:gap-4">
            {pokemondata.map((pokemon) => {
              return (
                <Link
                  to={`/${pokemon.id}?offset=${offset}&limit=${limit}`}
                  key={pokemon.id}
                >
                  <div
                    key={pokemon.id}
                    className={`flex flex-col text-center p-4 bg-white gap-2   border-black border-4 rounded-xl shadow-md  hover:bg-${pokemon.types[0].type.name}`}
                  >
                    <h4 className="text-end">
                      #{pokemon.id.toString().padStart(4, '0')}
                    </h4>

                    <img
                      src={
                        pokemon.sprites.other?.['official-artwork']
                          ?.front_default
                          ? pokemon.sprites.other?.['official-artwork']
                              ?.front_default
                          : question
                      }
                      alt={pokemon.name}
                    />

                    <h2 className=" sm:text-xl truncate">{pokemon.name}</h2>
                  </div>
                </Link>
              );
            })}
          </article>
          <div className="mt-5 flex justify-center gap-4 items-center p-2 ">
            <button
              className={`bg-white px-2.5 rounded-xl border-2 border-black   ${
                !prevUrl
                  ? 'opacity-50 cursor-not-allowed'
                  : ' hover:text-white hover:bg-black hover:border-white'
              }`}
              onClick={handlePrevPage}
              disabled={!prevUrl}
            >
              Previous
            </button>
            <button
              className={`
                bg-white px-2.5 rounded-xl border-2 border-black
                ${
                  !nextUrl
                    ? 'opacity-50 cursor-not-allowed'
                    : ' hover:text-white hover:bg-black hover:border-white'
                }`}
              onClick={handleNextPage}
              disabled={!nextUrl}
            >
              Next
            </button>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
