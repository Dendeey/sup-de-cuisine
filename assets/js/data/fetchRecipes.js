export async function fetchRecipes() {
  const response = await fetch(
    "https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json"
  );
  const data = await response.json();
  return data;
}
