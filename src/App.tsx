import axios from 'axios';
import { useEffect, useState } from 'react';
import { Result, Pokemon } from './type/PokemonType';
import { Link } from 'react-router-dom';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemondata, setPokemonData] = useState<Pokemon[]>([]);
  const [nextPage, setNextPage] = useState<string>();
  const [prevPage, setPrevPage] = useState<string>();
  const [currentPageUrl, setCurrentPageUrl] = useState<string>(() => {
    return 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
  });

  const fetchPokemonall = async () => {
    setLoading(true);
    try {
      const res = await axios.get(currentPageUrl);
      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
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
    localStorage.setItem('currentPageUrl', currentPageUrl);
  }, [currentPageUrl]);

  function gotoNextPage() {
    nextPage && setCurrentPageUrl(nextPage);
  }

  function gotoPrevPage() {
    prevPage && setCurrentPageUrl(prevPage);
  }
  function resetToFirstPage() {
    setCurrentPageUrl('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');
    localStorage.setItem(
      'currentPageUrl',
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
    );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="min-h-screen p-3 sm:p-10 overflow-y-auto bg-Primary">
          <h1
            className="text-center text-3xl text-white font-bold my-4 cursor-pointer hover:text-black hover:drop-shadow-sm "
            onClick={resetToFirstPage}
          >
            Pokedex
          </h1>
          <article className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 2xl:gap-4">
            {pokemondata.map((pokemon) => {
              return (
                <Link
                  to={`/${pokemon.id}?page=${currentPageUrl}`}
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
                          .front_default
                      }
                      alt={pokemon.name}
                    />
                    <h2 className=" sm:text-xl ">{pokemon.name}</h2>
                  </div>
                </Link>
              );
            })}
          </article>
          <div className="mt-5 flex justify-center gap-4 items-center p-2 ">
            <button
              className={`bg-white px-2.5 rounded-xl border-2 border-black   ${
                !prevPage
                  ? 'opacity-50 cursor-not-allowed'
                  : ' hover:text-white hover:bg-black hover:border-white'
              }`}
              onClick={gotoPrevPage}
              disabled={!prevPage}
            >
              Previous
            </button>
            <button
              className={`
                bg-white px-2.5 rounded-xl border-2 border-black
                ${
                  !nextPage
                    ? 'opacity-50 cursor-not-allowed'
                    : ' hover:text-white hover:bg-black hover:border-white'
                }`}
              onClick={gotoNextPage}
              disabled={!nextPage}
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
