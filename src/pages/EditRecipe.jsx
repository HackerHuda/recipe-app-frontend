import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UseGetUserId from '../hooks/UseGetUserId';
import { useNavigate, useParams } from 'react-router-dom';
import bgImg from "../pages/editbg.avif";
export default function EditRecipe() {
  const userId = UseGetUserId();
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    desc: "",
    image: null,
    userOwner:'',
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://recipe-app-api-fac8.onrender.com/api/v1/recipe/singlerecipe/${id}`);
        const fetchedRecipe = response.data.recipe;
        console.log(userId)
        if (fetchedRecipe.userOwner !== userId) {
          navigate("/");
        } else {
          setRecipe(fetchedRecipe);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [id, userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (e, idx) => {
    const { value } = e.target;
    const ingredients = [...recipe.ingredients];
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRecipe({ ...recipe, image: file });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('name', recipe.name);
      recipe.ingredients.forEach((ingredient, idx) => {
        formData.append(`ingredients[${idx}]`, ingredient);
      });
      formData.append('desc', recipe.desc);
      formData.append('image', recipe.image);
      
      const response = await axios.put(`https://recipe-app-api-fac8.onrender.com/api/v1/recipe/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Check the response data to ensure the update was successful
      if (response.data.success) {
        alert("Recipe updated");
        navigate("/");
      } else {
        console.error("Recipe update failed:", response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className='edit-main' style={{backgroundImage:`url(${bgImg})`}}>
      <div className='edit-recipe'>
        <h2>Edit Recipe</h2>
        <form onSubmit={onSubmit} className='editForm'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange} />
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, idx) => (
            <input key={idx} type="text" id="ingredients" name="ingredients" value={ingredient} onChange={(e) => handleIngredientChange(e, idx)} />
          ))}
          <button onClick={addIngredient} type="button" className="btn btn-outline-light">Add ingredient</button>
          <label htmlFor="desc">Instructions</label>
          <textarea
            type="text"
            id="desc"
            name="desc"
            value={recipe.desc}
            onChange={handleChange} />
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="file-upload" />
          <button type="submit" className="btn btn-outline-light">Update Recipe</button>
        </form>
      </div>
    </div>
  );
}
