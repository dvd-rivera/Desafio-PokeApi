import React from 'react'
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <div className='nav-container'>
        <div className="brand-container">
            <img src="src\assets\R.png" alt="" />
        </div>
        <div className="menu-container">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/characters">Pokemon</NavLink>
        </div>
    </div>
  )
}

export default Nav
