import { getCardData } from "./components/cards";
import { displayDropdown } from "./components/dropdown";

getCardData();
displayDropdown(
  "ingredient-btn",
  "ingredient-dropdown-content",
  "ingredient-arrow"
);
displayDropdown("appareil-btn", "appareil-dropdown-content", "appareil-arrow");
displayDropdown(
  "ustensile-btn",
  "ustensile-dropdown-content",
  "ustensile-arrow"
);
