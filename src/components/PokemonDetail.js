import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import pokeball from '../img/open-pokeball.png';
import clip from '../img/clip.png';
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

	const abilities = pokemonDetail.abilities?.map(ability =>
		ability.ability.name.replace(/^\w/, c => c.toUpperCase())
	);

	const moves = pokemonDetail.moves?.map(move =>
		move.move.name.replace(/^\w/, c => c.toUpperCase())
	);
	console.log(moves);

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
						<Link className=" d-block text-right" to={'/pokedex'}>
							<i className="bi bi-arrow-left-circle"></i>
						</Link>
					</div>
					<div className="detail-grid__2 mb-40">
						<h4 className="d-inline-block border rounded p-2 text-dark mt-3 mb-25">
							#{pokemonDetail.id}
						</h4>
						<h1 className="text-uppercase text-shadow mb-25">
							{pokemonDetail.name}
						</h1>
						<div className="d-flex justify-content-center gap-10">
							<div>
								<p className="detail-1">Estatura</p>
								<p className="detail-2 text-lowercase">
									{pokemonDetail.height / 10} mts
								</p>
							</div>
							<div>
								<p className="detail-1">Peso</p>
								<p className="detail-2 text-lowercase">
									{pokemonDetail.weight / 10} kg
								</p>
							</div>
						</div>

						<div className="container mb-5">
							<hr />
						</div>

						<div className="detail-grid__3">
							<div className="d-flex justify-content-center">
								<div>
									<p className="detail-3">Tipos</p>
									<h3 className="d-inline-block mb-3 detail-type">
										{types && types[0]}
									</h3>
									<h3
										className={`mb-3 detail-type ml-10 ${
											types && types[1] ? 'd-inline-block' : 'd-none'
										}`}
									>
										{types && types[1]}
									</h3>
								</div>
							</div>
							<div className="d-flex justify-content-center">
								<div>
									<p className="detail-3">Habilidades</p>
									<h3 className="d-inline-block mb-3 detail-ability">
										{abilities && abilities[0]}
									</h3>
									<h3
										className={`mb-3 detail-ability ml-10 ${
											abilities && abilities[1] ? 'd-inline-block' : 'd-none'
										}`}
									>
										{abilities && abilities[1]}
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container detail-grid">
					<div className="detail-grid__1">
						<h3 className="transp">.</h3>
					</div>
					<div className="container detail-grid__2 mb-40">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h2 className="detail-moves">Estadísticas</h2>
							<img className="d-inline" src={clip} alt="Clip" />
						</div>
						<p className="detail-move">Estadísticas</p>
					</div>
				</div>

				<div className="container detail-grid">
					<div className="detail-grid__1">
						<h3 className="transp">.</h3>
					</div>
					<div className="container detail-grid__2 mb-50">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h2 className="detail-moves">Movimientos</h2>
							<img className="clip" src={clip} alt="Clip" />
						</div>
						<p className="detail-move">
							{moves.map((move, index) => (
								<span className="border" key={index}>
									{move}
								</span>
							))}
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

export default PokemonDetail;
