import PokeApiService from '../../services/pokeapi.service.js';

interface LocalSearchResponse {
  results: Array<{ id: string; name: string; url: string }>;
}

it('calls pokeApi service and returns a pokemon list', async () => {
  const result = await new PokeApiService().searchPokemons();
  const data = result.data as LocalSearchResponse;
  expect(data.results.length).toBe(20);
});

it('retrieves one pokemon', async () => {
  const result = await new PokeApiService().getPokemon('1');
  const data = result.data;
  expect(data.name).toBe('bulbasaur');
});
