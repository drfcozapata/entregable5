import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import pokeball from '../img/open-pokeball.png';
import Footer from './Footer';
import Header from './Header';

const PokemonInfo = () => {
	const { id } = useParams();
	const [pokemonInfo, setPokemonInfo] = useState({});
	const colors = useSelector(state => state.colors);

	useEffect(() => {
		document.title = 'Pokedex';
		axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
			setPokemonInfo(res.data);
		});
	}, [id]);

	if (pokemonInfo.types) {
		let pokemonType = pokemonInfo.types?.[0].type.name;

		const colorType = colors.filter(color => color.name === pokemonType);

		const bckgColor = colorType[0].backgr;
		const textColor = colorType[0].color;
		document.body.style.background = bckgColor;
		document.body.style.color = textColor;
	}

	return (
		<Fragment>
			<Header />
			<div className="pokemon-info wrapper">
				<img className="pokeball" src={pokeball} alt="Open Pokeball" />
				<img
					className="pokemon"
					src={pokemonInfo.sprites?.other.dream_world.front_default}
					alt={`Imagen de ${pokemonInfo.name}`}
				/>
				<div className="container info-grid">
					<div className="info-grid__1">
						<Link to={'/pokedex'}>
							<i className="bi bi-arrow-left-circle"></i>
						</Link>
					</div>
					<div className="info-grid__2">
						<h1>{pokemonInfo.name}</h1>
						<h2>Tipo: {pokemonInfo.types?.[0].type.name}</h2>
					</div>
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

export default PokemonInfo;
