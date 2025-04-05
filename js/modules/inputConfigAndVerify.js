export function setDataLinkInputs() {

    //*-*-*-*-*-*-*-*-*-*-*-DADOS*-*-*-*-*-*-*-*-*-*-*-
    // listando as opções para cada input
    const inListProducts = ["V0300", "V0301", "V0302", "V0303", "V0304"];
    const inListColors = ["Prata", "Verde", "Grafite", "Azul", "Marsala"];
    const inListsizes = ["PP", "P", "M", "G", "SM"];

    // Seleciona os elementos do DOM input
    const productInput = document.getElementById('productInput');
    const colorInput = document.getElementById('colorInput');
    const sizeInput = document.getElementById('sizeInput');

    // Seleciona o elemento do DOM datalist
    const datalistProducts = document.getElementById('inList-products');
    const datalistColors = document.getElementById('inList-colors');
    const datalistSizes = document.getElementById('inList-sizes');
    //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


    //.-.-.-.-.-.-.-.-.-.-.-METODOS.-.-.-.-.-.-.-.-.-.-.- 
    // Insere na lista pega no DOM (dataList) os valores do array (items) 
    function populateDatalist(datalist, items) {
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            datalist.appendChild(option);
        });
    }

    // Verifica se o valor do input pego no DOM corresponde a um valore do array
    function validateInput(input, list) {
        if (!list.includes(input.value)) {
            alert(`O valor "${input.value}" não é válido. Por favor, selecione um valor da lista.`);
            input.value = '';
            input.focus();
            return false;
        }
        return true;
    };
    //.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-


    //._.-.-.-.-.-.-.-.-IMPLEMENTAÇÕES//._.-.-.-.-.-.-.-.-
    // Preenche cada datalist usando o método auxiliar generico populateDatalist
    populateDatalist(datalistProducts, inListProducts);
    populateDatalist(datalistColors, inListColors);
    populateDatalist(datalistSizes, inListsizes);

    // Adiciona evento validação aos inputs usando o metodo validateInput
    productInput.addEventListener('change', () => validateInput(productInput, inListProducts));
    colorInput.addEventListener('change', () => validateInput(colorInput, inListColors));
    sizeInput.addEventListener('change', () => validateInput(sizeInput, inListsizes));
    //-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
};

export function validateInputs(productInput, colorInput, sizeInput, errorMessage) {
    let isValid = true;

    // Clear previous error message
    errorMessage.textContent = '';

    // Check if any field is empty
    if (!productInput.value.trim() || !colorInput.value.trim() || !sizeInput.value.trim()) {
        errorMessage.textContent = '⚠ Preencha todos os campos. ⚠';
        isValid = false;
    }

    return isValid;
};

