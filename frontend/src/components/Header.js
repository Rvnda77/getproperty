import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <nav>
        <Link to="/">Home</Link> | <Link to="/create-property">Create Property</Link> | <Link to="/auth">Login</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
