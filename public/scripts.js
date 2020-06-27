// Redirect for recipe details
const cards = document.querySelectorAll('.card_recipe');

for (let card of cards) {
  card.addEventListener('click', () => {
    const recipeId = card.getAttribute('id');
    window.location.href = `/receitas/${recipeId}`
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



// const modalOverlay = document.querySelector('.modal_overlay');
// const cards = document.querySelectorAll('.card_recipe')

// for (let card of cards) {
//     card.addEventListener('click', function() {
//         const imgRecipe = card.getAttribute('id') // Pega id da div .card_recipe
//         const nameRecipe = card.querySelector('.card_name').textContent // Pega texto que está dentro do h2 .card_recipe
//         const madeByRecipe = card.querySelector('.made_by').textContent // Pega texto que está dentro do p .made_by
//         modalOverlay.classList.add('active'); // Adiciona a classe ACTIVE para abrir o modal
//         modalOverlay.querySelector('img').src = `/assets/${imgRecipe}.png`; // Pega a imagem referente ao id - Nome da imagem deve ser o mesmo nome da ID
//         modalOverlay.querySelector('#nome_receita').textContent = nameRecipe; // Insere o texto que foi pego dentro do h2
//         modalOverlay.querySelector('#chef_receita').textContent = madeByRecipe; // Insere o texto que foi pego dentro do p
//     })
// }

// modalOverlay.querySelector('.close_modal').addEventListener('click', function() {

//     modalOverlay.classList.remove('active');
//     modalOverlay.querySelector('img').src = "";

// })