import React, { useState } from 'react';
import trainers from '../img/trainers.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo-pokedex.png';

const Login = () => {
	const [userName, setUserName] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();

		dispatch({ type: 'SET_USER_NAME', payload: userName });
		setUserName('');
		navigate('/pokedex');
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<div>
				<img className="logo-login mb-4" src={logo} alt="Logo Pokedex" />
				<h1 className="text-center mt-5" style={{ color: 'red' }}>
					¡Hola entrenador!
				</h1>
			</div>
			<div>
				<form
					className="form-group form-login d-flex justify-content-center mb-4"
					onSubmit={handleSubmit}
				>
					<input
						className="form-control w-75"
						type="text"
						placeholder="Coloca tu nombre para ingresar"
						value={userName}
						onChange={e => setUserName(e.target.value)}
						required
					/>
					<button className="btn btn-danger">Ingresar</button>
				</form>
				<img className="trainers" src={trainers} alt="Logo Trainers" />
			</div>
		</div>
	);
};

export default Login;
