import { Link, useLoaderData } from 'react-router-dom';
import { Pokemon } from '../type/PokemonType';
import { IoIosArrowBack } from 'react-icons/io';
// import { TbPokeball } from 'react-icons/tb';
import pokeball from '../assets/pokeball.png';
function Detail() {
  const pokemon = useLoaderData() as Pokemon;
  function addZero(num: number): string {
    return num.toString().padStart(4, '0');
  }

  return (
    <main className="min-h-screen flex justify-center items-center  overflow-y-auto">
      <article
        className={`bg-${pokemon.types[0].type.name} relative  flex  flex-col w-full   sm:max-w-xl  p-2  sm:shadow-md sm:rounded-xl sm:flex-row  sm:border-4 sm:border-black`}
      >
        {/* section top */}
        <div className={`relative p-4`}>
          {/* tap on top */}
          <div className="flex justify-between items-center w-full font-bold text-white">
            <Link to="/" className="flex px-1 items-center gap-2 z-20 group">
              <div className="rounded-full p-0.5 group-hover:bg-gray-200 ">
                <IoIosArrowBack className="text-white group-hover:text-black" />
              </div>
              <h1 className="first-letter:uppercase">{pokemon.name}</h1>
            </Link>
            <h1>#{addZero(pokemon.id)}</h1>
          </div>
          {/* pokemon ball background */}
          <img
            src={pokeball}
            alt=""
            className="absolute opacity-15 size-40 top-2 right-2 sm:left-1/4 text-black  aspect-square"
          />

          {/* image */}
          <img
            src={pokemon.sprites.other?.['official-artwork'].front_default}
            alt={pokemon.name}
            className=" z-10  translate-y-1/3 sm:translate-y-[10%]"
          />
        </div>
        {/* section bottom */}
        <div className="p-4 bg-white flex flex-col rounded-lg ">
          {/* pokemon type */}
          <div className="flex gap-2 flex-row justify-center items-center mt-20 sm:mt-0">
            {pokemon.types.map((pokemon) => {
              return (
                <div
                  className={`bg-${pokemon.type.name} text-white px-2.5 py-0.5 rounded-3xl first-letter:uppercase font-medium`}
                >
                  {pokemon.type.name}
                </div>
              );
            })}
          </div>
          {/* pokemon about */}
          <div className="text-center">
            <h1
              className={`text-xl py-3  font-bold text-${pokemon.types[0].type.name}`}
            >
              About
            </h1>
            <div className="grid grid-cols-3 gap-3 divide-x">
              <div>
                <div>{pokemon.weight} kg</div>
                <div>Weight</div>
              </div>
              <div>
                <div>{pokemon.height} m</div>
                <div>Height</div>
              </div>
              <div>
                <div>{pokemon.moves[0].move.name}</div>
                <div>Move</div>
              </div>
            </div>
            {/* pokemon stat */}
            <div className="p-3 grid grid-cols-3 gap-4 text-center ">
              {pokemon.stats.map((pokemon) => (
                <div className="grid grid-cols-1 divide-y">
                  <div className="">{pokemon.stat.name}</div>
                  <div className="">{pokemon.base_stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default Detail;
