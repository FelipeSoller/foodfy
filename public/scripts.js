// Redirect for recipe details
const cards = document.querySelectorAll('.card_recipe');

for (let card of cards) {
  card.addEventListener('click', () => {
    const recipeId = card.getAttribute('id');
    window.location.href = `/recipes/${recipeId}`
    console.log(recipeId)
  });
}

// Hide/Show Button
const buttons = document.querySelectorAll('.btn-collapse')

for (let button of buttons) {
  button.addEventListener('click', () => {
    const target = document.querySelector(`#${button.getAttribute('target')} .details`)

    target.classList.toggle('hide-details')

    if (target.classList.contains('hide-details')){
      button.textContent = 'mostrar'
    }
    else {
      button.textContent = 'esconder'
    }
  })
}

// Add new ingredients
function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);

// Add new ingredients
function addStep() {
  const preparation = document.querySelector("#preparation");
  const fieldContainer = document.querySelectorAll(".step");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  preparation.appendChild(newField);
}

document
  .querySelector(".add-step")
  .addEventListener("click", addStep);