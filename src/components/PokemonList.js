import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { useNavigate } from 'react-router-dom';

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);
	const [pokemonName, setPokemonName] = useState('');
	const [pokemonTypes, setPokemonTypes] = useState([]);
	const [types, setTypes] = useState([]);
	// const [pokemon, setPokemon] = useState({});
	const userName = useSelector(state => state.userName);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('https://pokeapi.co/api/v2/pokemon').then(res => {
			setPokemons(res.data.results);
			console.log(res.data.results);
		});
		axios
			.get('https://pokeapi.co/api/v2/type')
			.then(res => setPokemonTypes(res.data.results));
	}, []);

	const handleSubmit = e => {
		e.preventDefault();

		if (pokemonName === '') {
			return;
		} else {
			navigate(`/pokemon/${pokemonName.toLowerCase()}`);
		}
	};

	const handleType = e => {
		axios.get(e.target.value).then(res => {
			setTypes(res.data.pokemon);
		});
	};

	return (
		<div className=" pokemon-list">
			<Header />
			<div className="container wrapper">
				<h2 className="welcome-msg text-left">
					Bienvenido <br />
					{userName}
				</h2>
				<form
					className="form-group d-flex justify-content-center mb-4"
					onSubmit={handleSubmit}
				>
					<input
						className="form-control w-45"
						type="text"
						value={pokemonName}
						placeholder="Escribe el nombre del Pokemon que deseas buscar"
						onChange={e => setPokemonName(e.target.value)}
					/>
					<button className="btn btn-outline-primary">Buscar</button>
				</form>

				{/* Select by Type */}
				<div className="select">
					<label className="text-white mt-2">Buscar un tipo de Pokemon</label>
					<select className="form-control w-50" onChange={handleType}>
						<option value="">Selecciona un tipo de Pokemon</option>
						{pokemonTypes.map(pokemonType => (
							<option key={pokemonType.name} value={pokemonType.url}>
								{pokemonType.name.replace(/^\w/, c => c.toUpperCase())}
							</option>
						))}
					</select>
				</div>

				<div className="pokemon-cards">
					{pokemons.map(pokemon => (
						<PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PokemonList;
