export function displayDropdown(btnId, dropdownId, arrowId) {
  const btn = document.getElementById(btnId);
  const dropdown = document.getElementById(dropdownId);
  const arrow = document.getElementById(arrowId);

  btn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
    arrow.classList.toggle("searchbar_arrow_down");
  });
}
