import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemonUrl }) => {
	const [pokemon, setPokemon] = useState({});
	const [pokemonType, setPokemonType] = useState('');
	const [textColor, setTextColor] = useState('');
	const [bckgColor, setBckgColor] = useState('');
	const colors = useSelector(state => state.colors);

	useEffect(() => {
		axios.get(pokemonUrl).then(res => {
			setPokemon(res.data);
			setPokemonType(res.data.types[0].type.name);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pokemonUrl]);

	useEffect(() => {
		if (pokemonType) {
			const colorType = colors.filter(color => color.name === pokemonType);
			setTextColor(colorType[0].color);
			setBckgColor(colorType[0].backgr);
		}
	}, [pokemonType, colors]);

	return (
		<Link
			to={`/pokedex/${pokemon.id}`}
			style={{ textDecoration: 'none', color: `${textColor}` }}
		>
			<div className="card shadow">
				<div
					className="card-header"
					style={{ backgroundColor: `${bckgColor}` }}
				>
					<img
						className="header-image"
						src={pokemon.sprites?.other.home.front_default}
						alt={`Imagen de ${pokemon.name}`}
					/>
				</div>
				<div className="card-body">
					<h4 className="card-title">{pokemon.name}</h4>
					<p className="type1">
						{pokemon.types?.[0].type.name}
						{pokemon.types?.[1] && ` / ${pokemon.types?.[1].type.name}`}
					</p>
					<p className="type2 text-dark">Tipo</p>
					<div>
						<div className="d-flex justify-content-around">
							<div className="g-col-6">
								<p className="characteristic">HP</p>
								<p className="characteristic-value">
									{pokemon.stats?.[0].base_stat}
								</p>
							</div>
							<div className="g-col-6">
								<p className="characteristic">Ataque</p>
								<p className="characteristic-value">
									{pokemon.stats?.[1].base_stat}
								</p>
							</div>
						</div>
						<div className="d-flex justify-content-around">
							<div className="g-col-6">
								<p className="characteristic">Defensa</p>
								<p className="characteristic-value">
									{pokemon.stats?.[2].base_stat}
								</p>
							</div>
							<div className="g-col-6">
								<p className="characteristic">Velocidad</p>
								<p className="characteristic-value">
									{pokemon.stats?.[5].base_stat}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default PokemonCard;
