import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
	const userName = useSelector(state => state.userName);

	// if (userName) {
	if (true) {
		return <Outlet />;
	} else {
		return <Navigate to="/" />;
	}
};

export default ProtectedRoutes;
