import {NavLink} from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
        <h1>404: Page Not Found</h1>
        <NavLink to="/">Back to Login Page</NavLink>
        </div>
    );
}

export default NotFound;