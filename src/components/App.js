import React, { createContext, useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import '../css/app.css'
import {v4 as uuidv4} from 'uuid'
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

export const RecipeContext = createContext();

function App() {
  const[recipes, setRecipes] = useState(sampleRecipes)
  
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
}, [recipes])


const recipeContextValue = {
  handleRecipeAdd,
  handleRecipeDelete
}

  function handleRecipeAdd(){
    const newRecipe = {
      id: uuidv4(),
      name: "New",
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr.',
      ingredients: [
        { id: uuidv4(), name: 'Name', amount: '1 Tbs' }
      ]
    }
    setRecipes([ ...recipes, newRecipe ])
  }

  function handleRecipeDelete(id){
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }


  return(
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
    </RecipeContext.Provider>
  )
}
  
  const sampleRecipes = [
    {
        id: 1,
        name: "Shahi Pulaav",
        cookTime: 1.45,
        servings: 3,
        instructions: "1. Put ingredients in rice\n2. Put rice in container\n3. Eat rice",
        ingredients: [
          {
            id: 1,
            name: "Rice",
            amount: "125gm"
          },
          {
            id: 2,
            name: "spices, rest of the ingredients etc",
            amount: "100gm"
          }
        ]
      },
      {
        id: 2,
        name: "Paneer Masala",
        cookTime: 0.45,
        servings: 3,
        instructions: "1. Put ingredients in container\n2. Cook everything\n3. Eat it with rice",
        ingredients: [
          {
            id: 1,
            name: "Wanga",
            amount: "125gm"
          },
          {
            id: 2,
            name: "spices etc",
            amount: "100gm"
          }
        ]
      }
    ]

export default App;
