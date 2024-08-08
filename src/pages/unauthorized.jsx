import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="unauthorized-page">
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
            <Link to="/">Go back to Login</Link>
        </div>
    );
};

export default Unauthorized;