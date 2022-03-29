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
		async function fetchData() {
			const request = await axios.get(
				'https://pokeapi.co/api/v2/pokemon?limit=152'
			);
			setPokemons(request.data.results);
		}
		fetchData();

		async function fetchDataTypes() {
			const request = await axios.get('https://pokeapi.co/api/v2/type');
			setPokemonTypes(request.data.results);
		}
		fetchDataTypes();
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

				<div className="search">
					{/* Search by name */}
					<form
						className="form-group d-flex justify-content-center mb-4"
						onSubmit={handleSubmit}
					>
						<input
							className="form-control"
							type="text"
							value={pokemonName}
							placeholder="Escribe el nombre del Pokemon que deseas buscar"
							onChange={e => setPokemonName(e.target.value)}
						/>
						<button className="btn btn-danger">Buscar</button>
					</form>
					{/* Select by Type */}
					<div className="select">
						<select className="form-control" onChange={handleType}>
							<option value="">Selecciona un tipo de Pokemon</option>
							{pokemonTypes.map(pokemonType => (
								<option key={pokemonType.name} value={pokemonType.url}>
									{pokemonType.name.replace(/^\w/, c => c.toUpperCase())}
								</option>
							))}
						</select>
					</div>
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
