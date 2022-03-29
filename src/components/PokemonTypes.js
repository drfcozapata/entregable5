import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PokemonTypes = () => {
	const [pokemonTypes, setPokemonTypes] = useState([]);
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		axios
			.get('https://pokeapi.co/api/v2/type')
			.then(res => setPokemonTypes(res.data.results));
	}, []);

	const handleType = e => {
		axios.get(e.target.value).then(res => setPokemon(res.data.pokemon));
	};

	console.log(pokemonTypes);
	return (
		<div className="select">
			<label className="text-white mt-2">Buscar un tipo de Pokemon</label>
			<select className="form-control w-50" onChange={handleType}>
				<option value="">Selecciona un tipo de Pokemon</option>
				{pokemonTypes.map(pokemon => (
					<option key={pokemon.name} value={pokemon.url}>
						{pokemon.name.replace(/^\w/, c => c.toUpperCase())}
					</option>
				))}
			</select>
		</div>
	);
};

export default PokemonTypes;
