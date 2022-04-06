import { pokemonApi } from '../api/pokemonApi';

export const fetchAllPokemons = async () => {
	const resp = await pokemonApi.get('/pokemon?limit=1126');
	const smallPokemonList = resp.data.results;

	return pokemonList(smallPokemonList);
};

const pokemonList = smallPokemonList => {
	const pokemonArr = smallPokemonList.map(pokemon => {
		const pokeArr = pokemon.url.split('/');
		const id = pokeArr[6];

		return {
			id,
			name: pokemon.name,
			url: pokemon.url,
		};
	});
	return pokemonArr;
};
