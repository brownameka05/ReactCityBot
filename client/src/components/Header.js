import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
      <nav>
        <div className="nav-wrapper teal lighten-2">
          <Link to={'/'} className="brand-logo"> Welcome!</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to={'/shop'}>CITY FAVORITES</Link></li>
            <li><Link to={'/about'}>ABOUT CITYBOT</Link></li>
            <li><Link to={'/login'}>LOGIN</Link></li>
          </ul>
        </div>
      </nav>
  )
};

export default Header;
