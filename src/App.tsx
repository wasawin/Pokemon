import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pokedex, Pokemon } from './type/PokemonType';

function App() {
  const [data, setData] = useState<Pokemon[]>([]);

  const fetchPokemonall = async () => {
    const res = await axios.get(
      'https://pokeapi.co/api/v2/ability/?limit=6&offset=0'
    );
    const detailedPokemon = await Promise.all(
      res.data.results.map(async (pokemon: Pokedex) => {
        const detailResponse = await axios.get(pokemon.url);
        return detailResponse.data;
      })
    );
    setData(detailedPokemon);
  };

  console.log(data);

  useEffect(() => {
    fetchPokemonall();
  }, []);

  return (
    <>
      {/* {data.map((item, index) => {
        return (
          <div key={index}>
            <li>{item}</li>
          </div>
        );
      })} */}
    </>
  );
}

export default App;
