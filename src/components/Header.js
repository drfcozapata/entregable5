import React from 'react';
import header from '../img/logo-pokedex.png';

const Header = () => {
	return (
		<div className="header">
			<img src={header} alt="Logo Pokedex" />
		</div>
	);
};

export default Header;
