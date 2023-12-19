import React ,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import bgImg from '../pages/singlebg.jpg'
export default function SingleRecipe()  {
    const [recipe,setRecipe]= useState([]);
    const { id } = useParams();
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:9036/api/v1/recipe/singlerecipe/${id}`);
        setRecipe(response.data.recipe);
        
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    fetchRecipe();
    
  }, [id]);
 
    return (
      <div className='single-main'style={{backgroundImage:`url(${bgImg})`}}>
        <div className='single-recipe'>
          {recipe ? (
            <>
            <div className='row name-row'>
              <div className='col'>
                <h2>{recipe.name}</h2>
              </div>
              <div className="col ">
                <Link to={`/edit/${recipe._id}`}>
                  <button className='btn btn-outline-dark'>Edit</button>
                </Link>
                <Link to={`/delete/${recipe._id}`}>
                  <button className='btn btn-outline-dark'>Delete</button>
                </Link>
              </div>
             
            </div>
            <div className='row'>
              <div className='col'>
                <h3>Instructions:</h3>
                <p>{recipe.desc}</p>
                <h3>Ingredients:</h3>
                <ul className='ingredient'>
                  {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className='ingredients-list'>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className='col'>
                {recipe.image && <img src={recipe.image.secure_url} alt={recipe.name} />}
              </div>
            </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      
    )
}

