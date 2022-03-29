import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PokemonList from './components/PokemonList';
import PokemonInfo from './components/PokemonInfo';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
	return (
		<div className="text-center">
			<HashRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route element={<ProtectedRoutes />}>
						<Route path="/pokedex" element={<PokemonList />} />
						<Route path="/pokedex/:id" element={<PokemonInfo />} />
					</Route>
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
