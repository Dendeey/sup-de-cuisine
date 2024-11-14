// Fonction pour mettre à jour dynamiquement le compteur de recettes
export function updateRecipeCount() {
  const displayedRecipes = document.querySelectorAll(".recipe-card").length;
  const recipeCountDisplay = document.getElementById(
    "recipes-counter-container"
  );

  recipeCountDisplay.textContent = `${displayedRecipes} recette${
    displayedRecipes > 1 ? "s" : ""
  }`;
}
