import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Photoshare App</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/upload">Upload Photo</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;