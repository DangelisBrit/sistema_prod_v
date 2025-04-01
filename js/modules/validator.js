export function validateInputs(produtoInput, corInput, produtoError, corError) {
    let isValid = true;

    produtoError.textContent = '';
    corError.textContent = '';

    // Validação do produto
    if (!produtoInput.value.trim()) {
        produtoError.textContent = '⚠ Preencha Nome do produto.';
        isValid = false;
    } else if (produtoInput.value.trim().length < 3) {
        produtoError.textContent = '⚠ Nome deve ter 3+ caracteres.';
        isValid = false;
    }

    // Validação da cor
    if (!corInput.value.trim()) {
        corError.textContent = '⚠ Preencha Cor';
        isValid = false;
    } else if (!/^[a-zA-ZÀ-ÿ\s]{3,}$/.test(corInput.value)) {
        corError.textContent = '⚠ Cor deve conter apenas letras';
        isValid = false;
    }

    return isValid;
}
