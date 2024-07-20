import { Link, useLoaderData } from 'react-router-dom';
import { Pokemon } from '../type/PokemonType';
import { IoIosArrowBack } from 'react-icons/io';
// import { TbPokeball } from 'react-icons/tb';
import pokeball from '../assets/pokeball.png';
function Detail() {
  const pokemon = useLoaderData() as Pokemon;
  function addZero(num: number): string {
    return num.toString().padStart(3, '0');
  }

  return (
    <main className="h-screen flex justify-center items-center ">
      <article className="bg-red-200 rounded-xl h-full  max-w-md w-full p-2 shadow-md  flex  flex-col sm:flex-row">
        {/* section top */}
        <div
          className={` bg-${pokemon.types[0].type.name} flex flex-col items-center p-6 relative min-h-[50%]`}
        >
          {/* tap on top */}
          <div className="flex justify-between items-center w-full font-bold text-white">
            <Link to="/" className="flex justify-start items-center gap-2">
              <IoIosArrowBack className="text-white" />
              <h1>{pokemon.name}</h1>
            </Link>
            <h1>#{addZero(pokemon.id)}</h1>
          </div>
          {/* pokemon ball background */}
          <img
            src={pokeball}
            alt=""
            className="absolute opacity-15 size-40 top-2 right-2 text-black "
          />

          {/* image */}
          <img
            src={pokemon.sprites.other?.['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-full h-56 p-5 z-10 absolute "
          />
        </div>
        {/* section bottom */}
        <div className="w-full h-auto p-4 bg-white flex flex-col">
          {/* pokemon type */}
          <div className="flex gap-2 flex-row justify-center items-center">
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
                <div>{pokemon.height} kg</div>
                <div>Height</div>
              </div>
              <div>
                <div>{pokemon.height} kg</div>
                <div>Move</div>
              </div>
            </div>
            {/* pokemon stat */}
            <div className="p-3 ">
              {pokemon.stats.map((pokemon) => (
                <div className="grid grid-cols-2 divide-x">
                  <div className="text-start">{pokemon.stat.name}</div>
                  <div className="text-center">{pokemon.base_stat}</div>
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
