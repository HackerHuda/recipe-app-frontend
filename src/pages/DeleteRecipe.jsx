import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useGetUserId from '../hooks/UseGetUserId'
import bgImg from '../pages/deletebg.jpg'

export default function DeleteRecipe() {
  const {id}= useParams();
  const [recipe, setRecipe] = useState({});
  const navigate= useNavigate();
  const userId =useGetUserId();
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`https://recipe-app-api-fac8.onrender.com/api/v1/recipe/singlerecipe/${id}`);
      setRecipe(response.data.recipe);

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://recipe-app-api-fac8.onrender.com/api/v1/recipe/delete/${id}`,{
        data: { userId },
      });
      navigate("/")
    } catch (error) {
      console.error(error); 
    }
  };
  const backToSingle =async()=>{
    navigate(`/`)
  }
  return (
    <div className='delete-main' style={{backgroundImage:`url(${bgImg})`}}>
      <h1 className='delete-title'>Delete Recipe</h1>
      {recipe || userId===recipe.userOwner?(
        <>
          <p>Are you sure you want to delete the recipe "{recipe.name}"?</p>
          <div className='del-btn'>
            <button onClick={handleDelete} className='btn btn-outline-danger' style={{margin:"0px 10px"}}>Delete</button>
            <button onClick={backToSingle} className='btn btn-outline-dark'>No</button>
          </div>
          
        </>
      ):(<>
        <h4>sorry your not the owner of the recipe</h4>
      </>)

      }
      
    </div>
  );
}
