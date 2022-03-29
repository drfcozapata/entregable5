import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PokemonList from './components/PokemonList';
import ProtectedRoutes from './components/ProtectedRoutes';
import PokemonDetail from './components/PokemonDetail';

function App() {
	return (
		<div className="text-center">
			<HashRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route element={<ProtectedRoutes />}>
						<Route path="/pokedex" element={<PokemonList />} />
						<Route path="/pokedex/:id" element={<PokemonDetail />} />
					</Route>
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
