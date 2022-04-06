import { pokemonApi } from '../api/pokemonApi';

export const fetchPokemonsByType = async () => {
	const resp = await pokemonApi.get('/type');
	const smallPokemonByType = resp.data.results;

	return PokemonsByTypeList(smallPokemonByType);
};

const PokemonsByTypeList = smallPokemonByType => {
	const pokemonByTypeArr = smallPokemonByType.map(pokemonByType => {
		const pokeByTypeArr = pokemonByType.url.split('/');
		const id = pokeByTypeArr[6];

		return {
			id,
			name: pokemonByType.name,
			url: pokemonByType.url,
		};
	});

	pokemonByTypeArr.pop();
	pokemonByTypeArr.pop();

	return pokemonByTypeArr;
};
