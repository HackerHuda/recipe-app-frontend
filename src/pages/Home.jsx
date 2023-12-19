import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHeart } from '@fortawesome/free-regular-svg-icons'
//import useGetUserId from '../hooks/useGetUserId'
import bgImg from '../pages/homebg.webp'

export default function Home() {
  const [recipes,setRecipes]= useState([]);
  //const [likedRecipes, setLikedRecipes] = useState([]);
  //const userId = useGetUserId();

  useEffect(()=>{
    const fetchRecipe = async ()=>{
      try{
        const response = await axios.get("http://localhost:9036/api/v1/recipe/getRecipe");
        setRecipes(response.data.recipe);
        
      }catch(err){
        console.error(err)
      }
    };

  //   const fetchLikedRecipe = async ()=>{
  //     try{
  //       const response = await axios.get(`http://localhost:9036/api/v1/recipe/likesIds/${userId}`);
  //       setLikedRecipes(response.data.recipe.likedRecipes);
        
  //     }catch(err){
  //       console.error(err)
  //     }
  //   }
    fetchRecipe();
  //   fetchLikedRecipe();
  },[]);

  // const likeRecipe= async (recipeId)=>{
  //   try{
  //     const response = await axios.put("http://localhost:9036/api/v1/recipe/like",{
  //       recipeId,
  //       userId
  //     });
  //     setLikedRecipes(response.data.likeRecipe)
  //     setLikedRecipes((prevLikedRecipes) => [...prevLikedRecipes, recipeId]);
  //   }catch(err){
  //     console.error(err);
  //   }
  // }
  // const isRecipeLiked =(id)=> likedRecipes.includes(id);


  return (
    <div className='home' style={{backgroundImage:`url(${bgImg})`}}>
      <ul className='row'>
        {recipes.map((recipe)=>(
          <li key={recipe._id} className='col col-lg-4 col-md-6'>
            <div className='recipe-title'>
              <h2>{recipe.name}</h2>
              {/* <button onClick={()=> likeRecipe(recipe._id)}
                      disabled={isRecipeLiked(recipe._id)} 
                      className={`like-btn btn btn-danger`}>
                {isRecipeLiked(recipe._id)?"Liked":<FontAwesomeIcon icon={faHeart}/>}
              </button> */}
            </div>
            <Link to={`/recipe/${recipe._id}`} className='recipe-link'>
              <div className='desc'>
                <p>{recipe.desc}</p>
              </div>
              <img src={recipe.image.secure_url} alt=""/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
