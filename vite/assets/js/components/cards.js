export async function getCardData() {
  const reponse = await fetch(
    "https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json"
  );
  const cardData = await reponse.json();
  console.log(cardData);

  const recipesGrid = document.getElementById("recipes_grid");
  const card = document.createElement("article");
  recipesGrid.append(card);
  card.innerHTML = `
    <div class="recipes_img">
        <img src="/assets/img/json_recipes/${cardData[0].image}" alt="Image de la recette"/>
    </div>
    <div class="recipes_content">
        <div class="recipes_title">
          <h2>${cardData[0].name}</h2>
        </div>
        <div class="recipes_steps">
            <h3>Recette</h3>
            <p>
                ${cardData[0].description}
            </p>
        </div>
        <div class="recipes_ingredients">
            <h3>Ingrédients</h3>
            <ul>
                <li>
                  <h4 class="ingredient_title">${cardData[0].ingredients[0].ingredient}</h4>
                  <p class="ingredient_amount">${cardData[0].ingredients[0].quantity}</p>
                </li>
                <li>
                  <h4 class="ingredient_title">Crème de coco</h4>
                  <p class="ingredient_amount">4 cuillères</p>
                </li>
                <li>
                  <h4 class="ingredient_title">Glaçons</h4>
                  <p class="ingredient_amount">2</p>
                </li>
                <li>
                  <h4 class="ingredient_title">Jus de citron</h4>
                  <p class="ingredient_amount">2</p>
                </li>
                <li>
                  <h4 class="ingredient_title">Sucre</h4>
                  <p class="ingredient_amount">20 g</p>
                </li>
              </ul>
            </div>
        </div>
  `;
  return card;
}
