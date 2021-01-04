import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return (
        <ul className = "nav-links">
            {/*<li>*/}
            {/*    <NavLink to="/"> WELCOME PAGE</NavLink>*/}
            {/*</li>*/}
            {(auth.isLoggedIn || !auth.isLoggedIn) && (auth.userId !== "5fee440aa9c27f16a037e2ee" && auth.userId !== "5fefa843b714d309fabb0140") && (
                <li>
                    <NavLink to="/search"> SEARCH ENGINE</NavLink>
                </li>
            )}
            {(auth.isLoggedIn || !auth.isLoggedIn) && (auth.userId !== "5fee440aa9c27f16a037e2ee" && auth.userId !== "5fefa843b714d309fabb0140") && (
                <li>
                    <NavLink to="/allhotels"> All HOTELS</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth"> AUTHENTICATE</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (auth.userId === "5fee440aa9c27f16a037e2ee" || auth.userId === "5fefa843b714d309fabb0140") && (
                <li>
                    <NavLink to={`/${auth.userId}/hotels`}> MY HOTELS</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (auth.userId === "5fee440aa9c27f16a037e2ee" || auth.userId === "5fefa843b714d309fabb0140") && (
                <li>
                    <NavLink to="/hotels/new"> ADD HOTELS</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (auth.userId === "5fee440aa9c27f16a037e2ee" || auth.userId === "5fefa843b714d309fabb0140") && (
                <li>
                    <NavLink to="/hotels/users"> SEE ALL USERS</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button onClick = {auth.logout}>LOGOUT</button>
                </li>
            )}

        </ul>

    // <ul className = "nav-links">
    //     {/*<li>*/}
    //     {/*    <NavLink to="/"> WELCOME PAGE</NavLink>*/}
    //     {/*</li>*/}
    //     {(auth.isLoggedIn || !auth.isLoggedIn) && auth.userId !== "5ff23a8f60bb5e0017b1a8d6" && (
    //         <li>
    //             <NavLink to="/search"> SEARCH ENGINE</NavLink>
    //         </li>
    //     )}
    //     {(auth.isLoggedIn || !auth.isLoggedIn) && auth.userId !== "5ff23a8f60bb5e0017b1a8d6" && (
    //         <li>
    //             <NavLink to="/allhotels"> All HOTELS</NavLink>
    //         </li>
    //     )}
    //     {!auth.isLoggedIn && (
    //         <li>
    //             <NavLink to="/auth"> AUTHENTICATE</NavLink>
    //         </li>
    //     )}
    //     {auth.isLoggedIn && auth.userId === "5ff23a8f60bb5e0017b1a8d6" && (
    //         <li>
    //             <NavLink to={`/${auth.userId}/hotels`}> MY HOTELS</NavLink>
    //         </li>
    //     )}
    //     {auth.isLoggedIn && auth.userId === "5ff23a8f60bb5e0017b1a8d6" && (
    //         <li>
    //             <NavLink to="/hotels/new"> ADD HOTELS</NavLink>
    //         </li>
    //     )}
    //     {auth.isLoggedIn && auth.userId === "5ff23a8f60bb5e0017b1a8d6" && (
    //         <li>
    //             <NavLink to="/hotels/users"> SEE ALL USERS</NavLink>
    //         </li>
    //     )}
    //     {auth.isLoggedIn && (
    //         <li>
    //             <button onClick = {auth.logout}>LOGOUT</button>
    //         </li>
    //     )}
    //
    // </ul>
    );
};

export default NavLinks;