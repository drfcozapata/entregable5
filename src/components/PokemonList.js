import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import PokemonCard from './PokemonCard';
import usePokemon from '../hooks/usePokemon';
import { Loading } from './Loading';
import Pagination from './Pagination';
import usePokemonsByTYpe from '../hooks/usePokemonsByType';
import axios from 'axios';

const PokemonList = () => {
	const { isLoading, pokemons, setPokemons } = usePokemon();
	const { pokemonsByType } = usePokemonsByTYpe();
	const [page, setPage] = useState(1);
	const [searchPokemon, setSearchPokemon] = useState('');
	const userName = useSelector(state => state.userName);

	const perPage = 16;
	const lastIndex = page * perPage;
	const firstIndex = lastIndex - perPage;
	const pokemonsPaginated = () => {
		if (searchPokemon.length === 0 || searchPokemon === '') {
			return pokemons.slice(firstIndex, lastIndex);
		} else if (searchPokemon.length > 0) {
			const filteredPokemons = pokemons.filter(pokemon =>
				pokemon.name.includes(searchPokemon)
			);
			return filteredPokemons.slice(firstIndex, lastIndex);
		}
	};

	const handlePageClick = e => {
		const selectedPage = e.selected + 1;
		setPage(selectedPage);
	};

	const onSearchChange = e => {
		setPage(1);
		setSearchPokemon(e.target.value);
	};

	const filteredType = e => {
		setPage(1);
		axios.get(`https://pokeapi.co/api/v2/type/${e.target.value}`).then(res => {
			setPokemons(res.data.pokemon);
		});
	};

	return (
		<div className="pokemon-list">
			<Header />

			{/* Main */}
			<div className="container wrapper">
				<h2 className="welcome-msg text-left">
					Bienvenido <br />
					{userName}
				</h2>

				{/* Searches */}
				<div className="search">
					{/* Search By Name */}
					<input
						className="form-control pl-30"
						type="text"
						placeholder="Escribe el nombre del Pokemon que deseas buscar"
						value={searchPokemon}
						onChange={onSearchChange}
					/>
					{/* Search by Type */}
					<div className="select">
						<select className="form-control text-option" onClick={filteredType}>
							<option disabled value="">
								Selecciona un tipo de Pokemon
							</option>
							{pokemonsByType.map((pokemonType, index) => (
								<option value={index + 1} key={pokemonType.name}>
									{pokemonType.name.replace(/^\w/, c => c.toUpperCase())}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Pokemons Cards */}
				{isLoading && <Loading />}
				<div className="pokemon-cards">
					{pokemonsPaginated().map(pokemon => (
						<PokemonCard
							key={pokemon.url ? pokemon.url : pokemon.pokemon?.url}
							pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon?.url}
						/>
					))}
				</div>

				{/* Pagination */}
				<Pagination handlePageClick={handlePageClick} />
			</div>
			<Footer />
		</div>
	);
};

export default PokemonList;
