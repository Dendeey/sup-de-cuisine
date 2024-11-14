import { fetchRecipes } from "./data";
import { updateRecipeCount } from "./components/counter";

// Fonction pour extraire et standardiser les éléments de chaque type (ingrédients, appareils, ustensiles)
function getUniqueItems(data, key) {
  const items = data.flatMap((recipe) => {
    if (key === "ingredients") {
      return recipe[key].map((ingredient) => ingredient.ingredient); // Extraire le nom de l'ingrédient
    }
    return recipe[key];
  });

  const uniqueItems = new Set();

  items.forEach((item) => {
    if (typeof item === "string") {
      // Vérifier que l'élément est une chaîne
      const standardizedItem = item.toLowerCase().replace(/s\b/, "");
      uniqueItems.add(standardizedItem);
    }
  });

  return Array.from(uniqueItems);
}

export async function populateDropdownLists() {
  const data = await fetchRecipes(); // Suppose que fetchRecipes() retourne les données de l'API

  const ingredients = getUniqueItems(data, "ingredients");
  const appliances = getUniqueItems(data, "appliance");
  const utensils = getUniqueItems(data, "ustensils");

  fillDropdownList("ingredient-dropdown-content", ingredients, "ingredients");
  fillDropdownList("appareil-dropdown-content", appliances, "appliances");
  fillDropdownList("ustensile-dropdown-content", utensils, "utensils");
}

// Fonction utilitaire pour remplir une liste déroulante
function fillDropdownList(containerId, items, type) {
  const dropdownContent = document.getElementById(containerId);
  const itemsContainer = dropdownContent.querySelector(".dropdown_items");
  itemsContainer.innerHTML = ""; // Réinitialiser la liste

  items.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("dropdown_item");
    li.textContent = item;

    // Ajouter l'événement click pour ajouter un tag avec le bon type
    li.addEventListener("click", () => {
      addTag(item, type); // Passez le type ici
    });

    itemsContainer.appendChild(li);
  });
}

export function setupSearchInDropdown() {
  document
    .querySelectorAll(".dropdown_searchbar_container input")
    .forEach((input) => {
      input.addEventListener("input", (event) => {
        const filterText = event.target.value.toLowerCase();
        const itemsContainer = event.target
          .closest(".dropdown_content")
          .querySelector(".dropdown_items");

        Array.from(itemsContainer.children).forEach((item) => {
          if (item.textContent.toLowerCase().includes(filterText)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
}

function addTag(tagText, type) {
  const tagContainer = document.getElementById("tag-filter-container");

  // Vérifier si le tag existe déjà
  if (activeTags[type].includes(tagText)) {
    return; // Ne pas ajouter le tag s'il est déjà présent
  }

  // Ajouter le tag dans activeTags
  activeTags[type].push(tagText);

  // Créer le bouton de tag
  const tag = document.createElement("button");
  tag.classList.add("tag_filter");
  tag.innerHTML = `
    ${tagText}
    <i class="fa-solid fa-xmark fa-xl"></i>
  `;

  tag.querySelector("i").addEventListener("click", () => {
    tag.remove();
    activeTags[type] = activeTags[type].filter((t) => t !== tagText); // Supprimer le tag des actifs
    updateDisplayedRecipes(); // Réactualiser les recettes
    updateDropdownLists(); // Réactualiser les listes
  });

  tagContainer.appendChild(tag);
  updateDisplayedRecipes(); // Réactualiser les recettes initialement
  updateDropdownLists(); // Réactualiser les listes
}

let activeTags = {
  ingredients: [],
  appliances: [],
  utensils: [],
};

function updateDisplayedRecipes() {
  fetchRecipes().then((data) => {
    // Filtrer les recettes en fonction des tags actifs
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

    // Afficher les recettes filtrées
    displayRecipes(filteredRecipes);
  });
}

function displayRecipes(recipes) {
  const recipesGrid = document.getElementById("recipes_grid");
  recipesGrid.innerHTML = ""; // Réinitialiser la grille

  if (recipes.length === 0) {
    recipesGrid.innerHTML =
      "<p>Aucune recette ne correspond aux tags sélectionnés</p>";
    updateRecipeCount(); // Mettre à jour le compteur à zéro
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
          <img src="/assets/img/json_recipes/${recipe.image}" alt="Image de la recette ${recipe.name}" loading="lazy"/>
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

function updateDropdownLists() {
  fetchRecipes().then((data) => {
    const filteredRecipes = data.filter((recipe) => {
      // Même logique de filtrage que dans updateDisplayedRecipes
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

    // Extraire et remplir les listes avec les éléments disponibles
    const ingredients = getUniqueItems(filteredRecipes, "ingredients");
    const appliances = getUniqueItems(filteredRecipes, "appliance");
    const utensils = getUniqueItems(filteredRecipes, "ustensils");

    fillDropdownList("ingredient-dropdown-content", ingredients, "ingredients");
    fillDropdownList("appareil-dropdown-content", appliances, "appliances");
    fillDropdownList("ustensile-dropdown-content", utensils, "utensils");
  });
}
