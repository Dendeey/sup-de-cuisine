import { displayRecipes } from "./displayRecipes";
import { getActiveTags } from "../components/tags";
import { fetchRecipes } from "../data/fetchRecipes";
import { updateRecipeCount } from "../components/counter";
import { getImagePath } from "./displayRecipes";

export async function getCardData(query = "") {
  const cardData = await fetchRecipes();
  const recipesGrid = document.getElementById("recipes_grid");
  // Réinitialiser la grille pour chaque recherche
  recipesGrid.innerHTML = "";

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

    const card = document.createElement("article");
    card.classList.add("recipe-card");
    card.innerHTML = `
        <div class="recipes_img">
            <img src="${getImagePath(
              recipe.image
            )}" alt="Image de la recette" loading="lazy"/>
        </div>
        <div class="recipes_content">
            <div class="recipes_title">
              <h2>${recipe.name}</h2>
            </div>
            <div class="recipes_steps">
                <h3>Recette</h3>
                <p>${recipe.description}</p>
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

export function updateDisplayedRecipes() {
  fetchRecipes().then((data) => {
    const activeTags = getActiveTags();
    const filteredRecipes = data.filter((recipe) => {
      const ingredientMatch = activeTags.ingredients.every((tag) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
        )
      );
      const applianceMatch = activeTags.appliances.every((tag) =>
        recipe.appliance.toLowerCase().includes(tag.toLowerCase())
      );
      const utensilMatch = activeTags.utensils.every((tag) =>
        recipe.ustensils.some((utensil) =>
          utensil.toLowerCase().includes(tag.toLowerCase())
        )
      );

      return ingredientMatch && applianceMatch && utensilMatch;
    });

    displayRecipes(filteredRecipes);
  });
}
