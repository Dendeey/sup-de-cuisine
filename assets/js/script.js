import { getCardData } from "./components/cards";
import { displayDropdown } from "./components/dropdown";
import { populateDropdownLists, setupSearchInDropdown } from "./search";

document.addEventListener("DOMContentLoaded", () => {
  getCardData();
  // Fonction pour gérer la recherche en temps réel
  document
    .getElementById("searchbar-input")
    .addEventListener("input", (event) => {
      const query = event.target.value;
      if (query.length >= 3) {
        getCardData(query);
      } else {
        getCardData(""); // Affiche toutes les recettes si moins de 3 caractères
      }
    });
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
  populateDropdownLists();
  setupSearchInDropdown();
});
