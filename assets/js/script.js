import {
  populateDropdownLists,
  setupSearchInDropdown,
  displayDropdown,
} from "./components/dropdowns";
import { getCardData } from "./recipes/filterRecipes";

document.addEventListener("DOMContentLoaded", () => {
  // Afficher les recettes
  getCardData();
  // Fonction pour gérer la recherche en temps réel
  const searchInput = document.getElementById("searchbar-input");
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value;
    if (query.length >= 3) {
      // Effectuer la recherche si 3 caractères ou plus
      getCardData(query);
    } else {
      // Afficher toutes les recettes si moins de 3 caractères
      getCardData("");
    }
  });

  // Comportement des listes déroulantes
  displayDropdown(
    "ingredient-btn",
    "ingredient-dropdown-content",
    "ingredient-arrow"
  );
  displayDropdown(
    "appareil-btn",
    "appareil-dropdown-content",
    "appareil-arrow"
  );
  displayDropdown(
    "ustensile-btn",
    "ustensile-dropdown-content",
    "ustensile-arrow"
  );

  // Initialiser les listes déroulantes
  populateDropdownLists();
  setupSearchInDropdown();
});
