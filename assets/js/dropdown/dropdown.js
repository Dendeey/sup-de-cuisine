function rotateArrow() {
  document.querySelectorAll(".dropdown_title_container").forEach((button) => {
    button.addEventListener("click", function () {
      const dropdownContent = this.nextElementSibling;
      const arrowIcon = this.querySelector("i");

      // Fermer tous les autres menus
      document.querySelectorAll(".dropdown_content").forEach((content) => {
        if (content !== dropdownContent) {
          content.style.display = "none";
          const arrow = content.previousElementSibling.querySelector("i");
          arrow.classList.remove("searchbar_arrow_up");
          arrow.classList.add("searchbar_arrow_down");
        }
      });

      // Basculer l'affichage du menu cliqué
      if (dropdownContent.style.display === "flex") {
        dropdownContent.style.display = "none";
        arrowIcon.classList.remove("searchbar_arrow_up");
        arrowIcon.classList.add("searchbar_arrow_down");
      } else {
        dropdownContent.style.display = "flex";
        arrowIcon.classList.remove("searchbar_arrow_down");
        arrowIcon.classList.add("searchbar_arrow_up");
      }
    });
  });

  // Fermer les menus si on clique en dehors
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown_container")) {
      document.querySelectorAll(".dropdown_content").forEach((content) => {
        content.style.display = "none";
        const arrow = content.previousElementSibling.querySelector("i");
        arrow.classList.remove("searchbar_arrow_up");
        arrow.classList.add("searchbar_arrow_down");
      });
    }
  });
}

export { rotateArrow };
