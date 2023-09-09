import axios from "axios";

export const GET_POKEMON = "GET_POKEMON";
const GET_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/";

/**
 * This worker will call the pokemon API with the number of pokemon provided in the payload
 *
 * @param payload contains the number of the pokemon
 * @returns {function(): Promise<AxiosResponse<any>>}
 */
const getPokemonWorker = (payload) => () => {
  const url = GET_POKEMON_URL + payload.number;
  return axios.get(url).then((r) => r.data);
};

// Define as many workers as needed
export default [{action: GET_POKEMON, worker: getPokemonWorker}];
