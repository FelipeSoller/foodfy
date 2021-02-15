const showContent = document.querySelectorAll('.recipe-hide');

for (let item of showContent) {
    const showButton = item.querySelector('.hide');

    showButton.addEventListener('click', () => {
        item.querySelector('.content').classList.toggle('hidden');
        if (showButton.innerHTML == 'ESCONDER') {
            showButton.innerHTML = 'MOSTRAR';
        } else {
            showButton.innerHTML = 'ESCONDER';
        }
    });
}