import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import pokeball from '../img/open-pokeball.png';
import Footer from './Footer';
import Header from './Header';

const PokemonDetail = () => {
	const { id } = useParams();
	const [pokemonDetail, setPokemonDetail] = useState({});
	const colors = useSelector(state => state.colors);

	useEffect(() => {
		document.title = 'Pokedex';
		axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
			setPokemonDetail(res.data);
		});
	}, [id]);

	if (pokemonDetail.types) {
		let pokemonType = pokemonDetail.types?.[0].type.name;

		const colorType = colors.filter(color => color.name === pokemonType);

		const bckgColor = colorType[0].backgr;
		const textColor = colorType[0].color;
		document.body.style.background = bckgColor;
		document.body.style.color = textColor;
	}

	const types = pokemonDetail.types?.map(type =>
		type.type.name.replace(/^\w/, c => c.toUpperCase())
	);
	// console.log(types);

	return (
		<Fragment>
			<div className="overlay"></div>
			<Header />
			<div className="pokemon-detail wrapper">
				<img className="pokeball" src={pokeball} alt="Open Pokeball" />
				<img
					className="pokemon"
					src={pokemonDetail.sprites?.other.dream_world.front_default}
					alt={`Imagen de ${pokemonDetail.name}`}
				/>
				<div className="container detail-grid">
					<div className="detail-grid__1">
						<Link to={'/pokedex'}>
							<i className="bi bi-arrow-left-circle"></i>
						</Link>
					</div>
					<div className="detail-grid__2">
						<h2 className="d-inline-block border rounded p-2 text-dark mb-3">
							#{pokemonDetail.id}
						</h2>
						<h1 className="text-uppercase">{pokemonDetail.name}</h1>
						<div className="detail-1 d-flex justify-content-center gap-10">
							<div>
								<p className="detail-1">Height</p>
								<p className="detail-2 text-lowercase">
									{pokemonDetail.height / 10} mts
								</p>
							</div>
							<div>
								<p className="detail-1">Weight</p>
								<p className="detail-2 text-lowercase">
									{pokemonDetail.weight / 10} kg
								</p>
							</div>
						</div>
						<div className="container mb-5">
							<hr />
						</div>
						<div className="d-flex justify-content-center">
							<div>
								<p className="detail-3">Types</p>
								<h3 className="d-inline-block border rounded mb-3 detail-type">
									{types}
								</h3>
							</div>
						</div>

						<h3>Tipo: {pokemonDetail.types?.[0].type.name}</h3>
					</div>
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

export default PokemonDetail;
