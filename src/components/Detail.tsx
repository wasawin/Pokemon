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
    <main className="min-h-screen w-full flex justify-center items-center  overflow-y-auto  bg-Primary">
      <article
        className={`bg-${pokemon.types[0].type.name} relative  flex flex-col max-sm:min-h-screen max-sm:w-full p-2 sm:max-w-xl md:max-w-2xl sm:shadow-md sm:rounded-xl sm:flex-row  sm:border-4 sm:border-black`}
      >
        {/* section top */}
        <div
          className={`relative p-4 flex flex-col  items-center flex-grow sm:flex-grow-0`}
        >
          {/* tap on top */}
          <div className="flex justify-between items-center w-full font-bold text-white drop-shadow-lg">
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
            alt="pokeball"
            className="absolute size-48 sm:size-40 top-2 right-2 z-0"
          />

          {/* image */}
          <img
            src={pokemon.sprites.other?.['official-artwork'].front_default}
            alt={pokemon.name}
            className=" z-10  translate-y-20 sm:translate-y-7 mx-auto max-sm:max-w-60  "
          />
        </div>
        {/* section bottom */}
        <div className="p-4 bg-white flex flex-col rounded-lg w-full  sm:h-[50dvh]">
          {/* pokemon type */}
          <div className="flex gap-2 flex-row justify-center items-center pt-20 sm:pt-0">
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
          <div className="text-center flex flex-col justify-evenly h-full">
            <h1
              className={`text-xl py-3  font-bold text-${pokemon.types[0].type.name}`}
            >
              About
            </h1>
            <div>
              <div className="grid grid-cols-2 gap-3 uppercase divide-x">
                <div className="grid grid-cols-1 gap-2">
                  <div className=" ">{pokemon.weight} kg</div>
                  <div className="text-xs text-gray-500">Weight</div>
                </div>
                <div className=" grid grid-cols-1 gap-2">
                  <div className=" ">{pokemon.height} m</div>
                  <div className="text-xs text-gray-500">Height</div>
                </div>
              </div>
              {/* pokemon stat */}
              <div className="p-3 grid grid-cols-1  text-start uppercase text-xs">
                {pokemon.stats.map((pokemons) => (
                  <div className="grid grid-cols-2  font-medium">
                    <div className={`text-${pokemon.types[0].type.name}`}>
                      {pokemons.stat.name}
                    </div>
                    <div className="text-center">{pokemons.base_stat}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default Detail;
