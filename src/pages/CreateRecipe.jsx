import React, { useState } from 'react';
import axios from 'axios';
import UseGetUserId from '../hooks/UseGetUserId';
import {useNavigate} from 'react-router-dom';
import CreateBg from '../pages/createbg.avif';

export default function CreateRecipe() {
  const userId = UseGetUserId();
  const [recipe, setRecipe] = useState({
    name:"",
    ingredients:[],
    desc:"",
    image:null,
    userOwner:userId,
  });
  const navigate = useNavigate();

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setRecipe({...recipe,[name]:value})
  }

  const handleIngredientChange=(e,idx)=>{
    const {value} = e.target;
    const ingredients =recipe.ingredients;
    ingredients[idx]=value;
    setRecipe({...recipe,ingredients})
  }

  const addIngredient=()=>{
    setRecipe({...recipe, ingredients :[...recipe.ingredients,""]})
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRecipe({ ...recipe, image: file });
  };

  const onSubmit = async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('name', recipe.name);
      recipe.ingredients.forEach((ingredient, idx) => {
        formData.append(`ingredients[${idx}]`, ingredient);
      });
      formData.append('desc', recipe.desc);
      formData.append('image', recipe.image);
      formData.append('userOwner', recipe.userOwner);

      await axios.post("https://recipe-app-api-fac8.onrender.com/api/v1/recipe/createRecipe", formData,{
        headers:{
          'Content-Type':'multipart/form-data',
        },
      });
      alert("Recipe created")
      navigate("/")
      console.log(recipe)
    }catch(err){
      console.error(err)
    }
  }
  return (
    <div className='create-main' style={{backgroundImage:`url(${CreateBg})`}}>
      <div className='create-recipe'>
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name"
            name="name"
            onChange={handleChange}/>
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient,idx)=>(
            <input key={idx} type="text" id="ingredients" name="ingredients" value={ingredient} onChange={(e)=>handleIngredientChange(e,idx)}/>
          ))}
          <button onClick={addIngredient} type="button" className="btn btn-outline-dark">Add ingredient</button>
          <label htmlFor="desc">Instructions</label>
          <textarea 
            type="text"
            id="desc" 
            name="desc"
            onChange={handleChange}/>
          <label htmlFor="image">Image</label>
          <input 
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange} 
            className="file-upload"/>
          <button type="submit" className="btn btn-outline-dark">Create Recipe</button>
        </form>
      </div>
    </div>
    
  )
}
