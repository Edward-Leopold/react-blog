import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export default function Header() {

    return (
        <div>
            <header>
                <nav>
                    <NavLink exact activeclassname="active" to="/">Home</NavLink>
                    <NavLink exact activeclassname="active" to="/login">Login</NavLink>
                </nav>
            </header>
        </div>
    )
}
