import { fetchRecipes } from "../data";
import { updateRecipeCount } from "./counter";

export async function getCardData(query = "") {
  const cardData = await fetchRecipes();
  const recipesGrid = document.getElementById("recipes_grid");
  recipesGrid.innerHTML = ""; // Réinitialiser la grille pour chaque recherche

  // Filtrer les recettes en fonction de la recherche
  const filteredRecipes = cardData.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
      )
    );
  });

  // Si aucune recette n'est trouvée, afficher un message
  if (filteredRecipes.length === 0) {
    recipesGrid.innerHTML = `<p>Aucune recette ne contient '${query}'</p>`;
    return;
  }

  // Afficher les recettes filtrées
  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    const maxDescriptionLength = 250;
    const shortDescription =
      recipe.description.length > maxDescriptionLength
        ? recipe.description.slice(0, maxDescriptionLength) + "..."
        : recipe.description;

    const card = document.createElement("article");
    card.classList.add("recipe-card");
    card.innerHTML = `
      <div class="recipes_img">
          <img src="/assets/img/json_recipes/${recipe.image}" alt="Image de la recette" loading="lazy"/>
      </div>
      <div class="recipes_content">
          <div class="recipes_title">
            <h2>${recipe.name}</h2>
          </div>
          <div class="recipes_steps">
              <h3>Recette</h3>
              <p>${shortDescription}</p>
          </div>
          <div class="recipes_ingredients">
              <h3>Ingrédients</h3>
              <ul class="ingredient_list">
              </ul>
          </div>
      </div>
    `;

    const ingredientContainer = card.querySelector(".ingredient_list");
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      const ingredientList = document.createElement("li");
      ingredientList.innerHTML = ` 
        <h4 class="ingredient_title">${ingredient.ingredient}</h4>
        <div class="amount_unit_container">
            <p class="ingredient_amount">${ingredient.quantity || ""}</p>
            <p class="ingredient_unit">${ingredient.unit || ""}</p>
        </div>
      `;
      ingredientContainer.appendChild(ingredientList);
    }
    recipesGrid.appendChild(card);
  }

  // Mettre à jour le compteur des recettes
  updateRecipeCount(filteredRecipes.length);
}

// export async function getCardData() {
//   const cardData = await fetchRecipes();
//   const recipesGrid = document.getElementById("recipes_grid");
//   for (let i = 0; i < cardData.length; i++) {
//     const recipe = cardData[i];
//     // Limiter la description à 100 caractères
//     const maxDescriptionLength = 250;
//     const shortDescription =
//       recipe.description.length > maxDescriptionLength
//         ? recipe.description.slice(0, maxDescriptionLength) + "..."
//         : recipe.description;
//     const card = document.createElement("article");
//     card.classList.add("recipe-card");
//     card.innerHTML = `
//     <div class="recipes_img">
//         <img src="/assets/img/json_recipes/${recipe.image}" alt="Image de la recette" loading="lazy"/>
//     </div>
//     <div class="recipes_content">
//         <div class="recipes_title">
//           <h2>${recipe.name}</h2>
//         </div>
//         <div class="recipes_steps">
//             <h3>Recette</h3>
//             <p>
//                 ${shortDescription}
//             </p>
//         </div>
//         <div class="recipes_ingredients">
//             <h3>Ingrédients</h3>
//             <ul class="ingredient_list">
//             </ul>
//             </div>
//         </div>
//   `;

//     const ingredientContainer = card.querySelector(".ingredient_list");
//     for (let j = 0; j < recipe.ingredients.length; j++) {
//       const ingredient = recipe.ingredients[j];
//       const ingredientList = document.createElement("li");
//       ingredientList.innerHTML = `
//       <h4 class="ingredient_title">${ingredient.ingredient}</h4>
//       <div class="amount_unit_container">
//           <p class="ingredient_amount">${ingredient.quantity || ""}</p>
//           <p class="ingredient_unit">${ingredient.unit || ""}</p>
//       </div>
//       `;
//       ingredientContainer.appendChild(ingredientList);
//     }
//     recipesGrid.appendChild(card);
//   }
//   // Mettre à jour le compteur des recettes
//   updateRecipeCount();
// }
