import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(data => setBeers(data))
      .catch(error => console.error('Error fetching beers:', error));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search beers..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-button">Search</button>
      </div>
      <div className="beer-list">
        {filteredBeers.map(beer => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image_url} alt={beer.name} />
            <h3>{beer.name}</h3>
            <p>{beer.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
