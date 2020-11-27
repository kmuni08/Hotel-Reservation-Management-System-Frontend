import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return <ul className = "nav-links">
        <li>
            <NavLink to="/"> MAP</NavLink>
        </li>
        <li>
            <NavLink to="/u1/hotels" exact> MY HOTELS</NavLink>
        </li>
        <li>
            <NavLink to="/hotels/new" exact> ADD HOTELS</NavLink>
        </li>
        <li>
            <NavLink to="/searchengine"> SEARCH ENGINE</NavLink>
        </li>
        <li>
            <NavLink to="/auth"> AUTHENTICATE</NavLink>
        </li>
    </ul>
};

export default NavLinks;