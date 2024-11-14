import { addTag } from "./tags";
import { fetchRecipes } from "../data/fetchRecipes";

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

export function displayDropdown(btnId, dropdownId, arrowId) {
  const btn = document.getElementById(btnId);
  const dropdown = document.getElementById(dropdownId);
  const arrow = document.getElementById(arrowId);

  btn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
    arrow.classList.toggle("searchbar_arrow_down");
  });
}

// Fonction pour extraire et standardiser les éléments de chaque type (ingrédients, appareils, ustensiles)
function getUniqueItems(data, key) {
  const items = data.flatMap((recipe) => {
    if (key === "ingredients") {
      return recipe[key].map((ingredient) => ingredient.ingredient);
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

// Fonction utilitaire pour remplir une liste déroulante
function fillDropdownList(containerId, items, type) {
  const dropdownContent = document.getElementById(containerId);
  const itemsContainer = dropdownContent.querySelector(".dropdown_items");
  // Réinitialiser la liste
  itemsContainer.innerHTML = ""; 

  items.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("dropdown_item");
    li.textContent = item;

    // Ajouter l'événement click pour ajouter un tag avec le bon type
    li.addEventListener("click", () => {
      // Passez le type ici
      addTag(item, type); 
    });

    itemsContainer.appendChild(li);
  });
}

export async function populateDropdownLists() {
  const data = await fetchRecipes(); 

  const ingredients = getUniqueItems(data, "ingredients");
  const appliances = getUniqueItems(data, "appliance");
  const utensils = getUniqueItems(data, "ustensils");

  fillDropdownList("ingredient-dropdown-content", ingredients, "ingredients");
  fillDropdownList("appareil-dropdown-content", appliances, "appliances");
  fillDropdownList("ustensile-dropdown-content", utensils, "utensils");
}

export function updateDropdownLists() {
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
