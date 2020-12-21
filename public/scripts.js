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

    if (target.classList.contains('hide-details')) {
      button.textContent = 'mostrar'
    } else {
      button.textContent = 'esconder'
    }
  })
}

// Paginate

function paginate(selectedPage, totalPages) {
  let pages = [],
    oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {

      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }
      pages.push(currentPage);

      oldPage = currentPage
    }
  }
  return pages
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page, total);

  let elements = ""

  for (let page of pages) {
    if (String(page).includes("...")) {
      elements += `<span>${page}</span>`
    } else {
      if (filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
      } else {
        elements += `<a href="?page=${page}">${page}</a>`
      }
    }
  }
  
  pagination.innerHTML = elements;
}

const pagination = document.querySelector('.pagination');

if (pagination) {
  createPagination(pagination);
}