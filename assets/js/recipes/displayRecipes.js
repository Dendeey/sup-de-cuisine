import { updateRecipeCount } from "../components/counter";

// Fonction pour obtenir le chemin de l'image avec le bon format
export function getImagePath(imageName) {
  return `/assets/img/json_recipes/${imageName.replace(/\.jpg$/, ".webp")}`;
}

export function displayRecipes(recipes) {
  const recipesGrid = document.getElementById("recipes_grid");
  // Réinitialiser la grille
  recipesGrid.innerHTML = "";

  if (recipes.length === 0) {
    recipesGrid.innerHTML =
      "<p>Aucune recette ne correspond aux tags sélectionnés</p>";
    // Mettre à jour le compteur à zéro
    updateRecipeCount();
    return;
  }

  recipes.forEach((recipe) => {
    const maxDescriptionLength = 250;
    const shortDescription =
      recipe.description.length > maxDescriptionLength
        ? recipe.description.slice(0, maxDescriptionLength) + "..."
        : recipe.description;

    const card = document.createElement("article");
    card.classList.add("recipe-card");

    card.innerHTML = `
        <div class="recipes_img">
            <img src="${getImagePath(recipe.image)}" alt="Image de la recette ${
      recipe.name
    }" loading="lazy"/>
        </div>
        <div class="recipes_content">
            <div class="recipes_title">
              <h2>${recipe.name}</h2>
              <span class="recipe-time">${recipe.time} min</span>
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
    recipe.ingredients.forEach((ingredient) => {
      const ingredientList = document.createElement("li");
      ingredientList.innerHTML = `
          <h4 class="ingredient_title">${ingredient.ingredient}</h4>
          <div class="amount_unit_container">
              <p class="ingredient_amount">${ingredient.quantity || ""}</p>
              <p class="ingredient_unit">${ingredient.unit || ""}</p>
          </div>
        `;
      ingredientContainer.appendChild(ingredientList);
    });

    recipesGrid.appendChild(card);
  });

  // Mettre à jour le compteur de recettes
  updateRecipeCount();
}
