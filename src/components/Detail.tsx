import { Link, useLoaderData } from 'react-router-dom';
import { Pokemon } from '../type/PokemonType';
function Detail() {
  const pokemon = useLoaderData() as Pokemon;
  return (
    <>
      <button>
        <Link to="/">Back</Link>
      </button>
      <div>
        <h1>Pokemon Detail for ID: {pokemon.id}</h1>
        <p>Name: {pokemon.name}</p>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    </>
  );
}

export default Detail;
