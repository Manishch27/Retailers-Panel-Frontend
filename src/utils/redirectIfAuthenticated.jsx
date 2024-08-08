import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ element }) => {
    const token = useSelector(state => state.auth.token);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return element;
};

export default RedirectIfAuthenticated;