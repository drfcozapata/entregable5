import React, { Fragment, useState } from 'react';
import Header from './Header';
import trainers from '../img/trainers.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
		<Fragment>
			<Header />
			<div className="wrapper d-flex flex-column justify-content-center align-items-center">
				<form
					className="form-group d-flex justify-content-center mb-4"
					onSubmit={handleSubmit}
				>
					<input
						className="form-control w-50"
						type="text"
						placeholder="Coloca tu nombre"
						value={userName}
						onChange={e => setUserName(e.target.value)}
						required
					/>
					<button className="btn btn-outline-primary">Ingresar</button>
				</form>
				<img className="trainers" src={trainers} alt="Logo Trainers" />
			</div>
		</Fragment>
	);
};

export default Login;
