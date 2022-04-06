import { useEffect, useState } from 'react';
import { fetchPokemonsByType } from '../helpers/fetchPokemonsByType';

const usePokemonsByTYpe = () => {
	const [isLoadingType, setIsLoadingType] = useState(true);
	const [pokemonsByType, setPokemonsByType] = useState([]);
	const [totalPagesByType, setTotalPagesByType] = useState(1);

	const perPage = 16;

	useEffect(() => {
		fetchPokemonsByType().then(pokemonsByType => {
			setIsLoadingType(false);
			setPokemonsByType(pokemonsByType);
			setTotalPagesByType(Math.ceil(pokemonsByType.length / perPage));
		});
	}, []);

	return { isLoadingType, pokemonsByType, totalPagesByType };
};

export default usePokemonsByTYpe;
