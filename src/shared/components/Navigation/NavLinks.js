import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {

    const auth = useContext(AuthContext);
    return <ul className = "nav-links">
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/"> MAP</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/allhotels" exact> All HOTELS</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/searchengine"> SEARCH ENGINE</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/u1/hotels" exact> MY HOTELS</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/hotels/new" exact> ADD HOTELS</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/auth"> AUTHENTICATE</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <button onClick = {auth.logout}>LOGOUT</button>
            </li>
        )}

    </ul>
};

export default NavLinks;