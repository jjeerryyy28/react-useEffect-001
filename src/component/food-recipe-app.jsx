import React, { useState, useEffect } from 'react';
import './RecipeApp.css';

const RecipeApp = () => {
 const [recipes, setRecipes] = useState([]);
  const API_ID = 'f0231db7';
  const API_KEY = '4372c72a63352e6ce5e0ab8635ec38ba';


  useEffect(() => {
    const fetchData = async () => {
        try{
            const response = await fetch(
                `https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}`
            );
            if(!response.ok){
                throw new Error("Failed to fetch data from API");
            }
            const data = await response.json();
            console.log(data);
            setRecipes(data.hits);
        }
        catch(error){
            console.log("Error fetching data", error);
        }
    };
    fetchData();
  }, []);

  return (
    <div className="recipe-app">
      <h1>Food Recipe App</h1>
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div className="recipe" key={index}>
              <h2>{recipe.recipe.label}</h2>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <p>Calories: {recipe.recipe.calories.toFixed(2)}</p>
              <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                View Recipe
              </a>
            </div>
          ))
        ) : (
          <p>Please be patient, site is loading...</p>
        )}
      </div>
    </div>
  );
};

export default RecipeApp;
