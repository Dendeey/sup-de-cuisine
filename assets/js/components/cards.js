export async function getCardData() {
  const reponse = await fetch(
    "https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json"
  );
  const cardData = await reponse.json();

  const recipesGrid = document.getElementById("recipes_grid");
  for (let i = 0; i < cardData.length; i++) {
    const recipe = cardData[i];
    // Limiter la description à 100 caractères
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
            <p>
                ${shortDescription}
            </p>
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
  updateRecipeCount();
}

// Fonction pour mettre à jour dynamiquement le compteur de recettes
function updateRecipeCount() {
  const displayedRecipes = document.querySelectorAll(".recipe-card").length; // Compter les cartes affichées
  const recipeCountDisplay = document.getElementById(
    "recipes-counter-container"
  );

  recipeCountDisplay.textContent = `${displayedRecipes} recette${
    displayedRecipes > 1 ? "s" : ""
  }`;
}
