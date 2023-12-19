// SearchRecipe.js
import React, { useState } from 'react';
import axios from 'axios';
import bgImg from '../pages/searchbg.jpg'
export default function SearchRecipe() {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://recipe-app-api-cifg.onrender.com/api/v1/recipe/search/${searchName}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main-search' style={{backgroundImage:`url(${bgImg})`}}>
      <div className='searchbar'>
      <h2>Recipe Search</h2>
        <input
          type="text"
          placeholder="Enter recipe name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch} className='btn btn-outline-dark'>Search</button>
      </div>
      {searchResults ? (
        <div className='row search-row'>
          <div className='col'>
            <h2>{searchResults.name}</h2>
            <h3>Instructions</h3>
            <p>{searchResults.desc}</p>
            <h3>Ingredients</h3>
            <ul className='ingredient'>
                {searchResults.ingredients && searchResults.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </ul>
          </div>
          <div className='col'>
            
            {searchResults.image && <img src={searchResults.image.secure_url} alt={searchResults.name} />}
          </div>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

