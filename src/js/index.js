// Get filter button
const botaoFiltrar = document.querySelector('.btn-filtrar');

// When the filter button is clicked
botaoFiltrar.addEventListener('click', function () {
    const categoriaSelecionada = document.querySelector('#categoria').value;
    const precoMaximoSelecionado = document.querySelector('#preco').value;

    const cartas = document.querySelectorAll('.carta');

    let encontrouAlgumaCarta = false; // Tracks if at least one card is shown

    cartas.forEach(function (carta) {
        const categoriaCarta = carta.dataset.categoria;
        const precoCarta = carta.dataset.preco;

        let mostrarCarta = true;

        const temFiltrodeCategoria = categoriaSelecionada !== '';
        const cartaNaoBateComFiltroDeCategoria = categoriaSelecionada.toLowerCase() !== categoriaCarta.toLowerCase();

        const temFiltroDePreco = precoMaximoSelecionado !== '';
        const cartaNaoBatecomFiltroDeprecoMaximo = parseFloat(precoCarta) > parseFloat(precoMaximoSelecionado);

        // Apply category filter
        if (temFiltrodeCategoria && cartaNaoBateComFiltroDeCategoria) {
            mostrarCarta = false;
        }

        // Apply price filter
        if (temFiltroDePreco && cartaNaoBatecomFiltroDeprecoMaximo) {
            mostrarCarta = false;
        }

        // Show or hide card based on filter
        if (mostrarCarta) {
            carta.classList.add('mostrar');
            carta.classList.remove('esconder');
            encontrouAlgumaCarta = true;
        } else {
            carta.classList.remove('mostrar');
            carta.classList.add('esconder');
        }
    });

    // Show error message if no cards match
    const mensagemErro = document.querySelector('#mensagem-erro');
    if (!encontrouAlgumaCarta) {
        mensagemErro.classList.remove('esconder');
        mensagemErro.classList.add('mostrar');

        // Animation for alert (optional visual effect)
        mensagemErro.style.animation = 'shake 0.3s';
        setTimeout(() => mensagemErro.style.animation = '', 300);
    } else {
        mensagemErro.classList.add('esconder');
        mensagemErro.classList.remove('mostrar');
    }
});

// Allow filtering when pressing Enter in any input field
document.addEventListener('keydown', function (event) {
    const isEnterKey = event.key === 'Enter';
    const isTargetInput = event.target.matches('#categoria') || event.target.matches('#preco');

    if (isEnterKey && isTargetInput) {
        event.preventDefault(); // Prevent default form submission
        document.querySelector('.btn-filtrar').click(); // Trigger filter button
    }
});
