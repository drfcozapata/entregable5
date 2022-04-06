import { useEffect, useState } from 'react';
import { fetchAllPokemons } from '../helpers/fetchAllPokemons';

const usePokemon = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [pokemons, setPokemons] = useState([]);
	const [totalPages, setTotalPages] = useState(1);

	const perPage = 16;

	useEffect(() => {
		fetchAllPokemons().then(pokemons => {
			setIsLoading(false);
			setPokemons(pokemons);
			setTotalPages(Math.ceil(pokemons.length / perPage));
		});
	}, []);

	return { isLoading, pokemons, setPokemons, totalPages };
};

export default usePokemon;
