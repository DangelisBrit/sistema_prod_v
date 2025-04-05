import { carregarProdutos, getCodigosProdutos } from './dataService.js';

//*-*-*-*-*-*-*-*-*-*-*-DADOS*-*-*-*-*-*-*-*-*-*-*-
// Elementos de DOM input para validação
const productInput = document.getElementById('productInput');
const colorInput = document.getElementById('colorInput');
const sizeInput = document.getElementById('sizeInput');
// Elementos do datalist para preencher
const datalistProducts = document.getElementById('inList-products');
const datalistColors = document.getElementById('inList-colors');
const datalistSizes = document.getElementById('inList-sizes');

// Variáveis que serão preenchidas após loadProduct()
let inListProducts = [];
let inListColors = [];
let inListSizes = [];
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

//.-.-.-.-.-.-.-.-.-.-.-METODOS.-.-.-.-.-.-.-.-.-.-.- 
// Função para preencher os datalist vazios
async function initializeProductData() {
    try {
        // Pega os dados da API tratados pelo módulo dataService 
        await carregarProdutos();
        // Após obter o dado tratado com os códigos de produtos os colocam em no array
        inListProducts = getCodigosProdutos();
        // Define outras listas
        inListColors = ["Prata", "Verde", "Grafite", "Azul", "Marsala"];
        inListSizes = ["PP", "P", "M", "G", "SM"];

        // Preenche os datalists nos inputs
        populateDatalist(datalistProducts, inListProducts);
        populateDatalist(datalistColors, inListColors);
        populateDatalist(datalistSizes, inListSizes);
        // Retorna os dados preenchidos nos arrays
        return { inListProducts, inListColors, inListSizes };
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

// Método que ao passar o nome da lista (dataList) e nome do array (items) insere os items na lista correpondenrte, pelo DOM  
function populateDatalist(datalist, items) {
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        datalist.appendChild(option);
    });
}

//Pega o input no DOM,verifica o valor se corresponde a um item dentro do array
function validateInput(inputElement, validValues) {
    if (!validValues.includes(inputElement.value)) {
        alert(`O valor "${inputElement.value}" não é válido. Por favor, selecione um valor da lista.`);
        inputElement.value = '';
        inputElement.focus();
        return false;
    }
    return true;
}
//.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-

//*-*-*-*-*-*-*-*-*-*-*-IMPLEMENTAÇÃO*-*-*-*-*-*-*-*-*-*-*-

//Implementa o método validateInput, configuração nos eventos ao mudar os campos de entrada, verifica se os valores são válidos
export function setDataLinkInputs() {
    initializeProductData().then(() => {
        productInput.addEventListener('change', () => validateInput(productInput, inListProducts));
        colorInput.addEventListener('change', () => validateInput(colorInput, inListColors));
        sizeInput.addEventListener('change', () => validateInput(sizeInput, inListSizes));
    }).catch(error => {
        console.error('Falha ao inicializar dados:', error);
    });
}

//Métofdo para validar se os campos de entrada não estão vazios
export function validateInputs(productInput, colorInput, sizeInput, errorMessage) {
    let isValid = true;
    errorMessage.textContent = '';

    if (!productInput.value.trim() || !colorInput.value.trim() || !sizeInput.value.trim()) {
        errorMessage.textContent = '⚠ Preencha todos os campos. ⚠';
        isValid = false;
    }

    return isValid;
};
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-