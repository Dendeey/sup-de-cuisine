import { updateDisplayedRecipes } from "../recipes/filterRecipes";
import { updateDropdownLists } from "./dropdowns";

let activeTags = {
  ingredients: [],
  appliances: [],
  utensils: [],
};

export function addTag(tagText, type) {
  const tagContainer = document.getElementById("tag-filter-container");

  // Vérifier si le tag existe déjà
  if (activeTags[type].includes(tagText)) {
    // Ne pas ajouter le tag s'il est déjà présent
    return;
  }

  // Ajouter le tag dans activeTags
  activeTags[type].push(tagText);

  const tag = document.createElement("button");
  tag.classList.add("tag_filter");
  tag.innerHTML = `
      ${tagText}
      <i class="fa-solid fa-xmark fa-xl"></i>
    `;

  tag.querySelector("i").addEventListener("click", () => {
    tag.remove();
    // Supprimer le tag des actifs
    activeTags[type] = activeTags[type].filter((t) => t !== tagText);
    // Réactualiser les recettes
    updateDisplayedRecipes();
    // Réactualiser les listes
    updateDropdownLists();
  });

  tagContainer.appendChild(tag);
  // Réactualiser les recettes initialement
  updateDisplayedRecipes();
  // Réactualiser les listes
  updateDropdownLists();
}

export function getActiveTags() {
  return activeTags;
}
