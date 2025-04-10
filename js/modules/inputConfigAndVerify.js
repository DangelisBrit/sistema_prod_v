import { loadData, loadColor, loadSize } from './dataService.js';

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
// Função para preencher os arrays vazios e os carregam aos campos de dataLists inputs
async function initializeProductData() {
    try {
        // Podemos passando os parametros da função genérica loadData que carega dados de endpoints Json   
        inListProducts = await loadData({
            endpointApi: 'apis/produtos.json',
            propertyArrayApi: 'produtos',
            propertyMap: 'codigo',
            cacheName: 'produtos'
        });

        //Ou  criamos uma função que mapea os dados no próprio módulo dataService e importamos a função que ja carregou os dados
        inListColors = await loadColor();
        inListSizes = await loadSize();

        //Implementa o método populateDatalist que preenche os datalists dos inputs com os dados carregados nos arrays inList 
        populateDatalist(datalistProducts, inListProducts);
        populateDatalist(datalistColors, inListColors);
        populateDatalist(datalistSizes, inListSizes);

        //Retorna os dados preenchidos nos arrays
        return { inListProducts, inListColors, inListSizes };

        //Caso haja erro ao tentar carregar os dados, retorna um erro
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

//Método com função genérica que ao passar o a variável da lista (dataList) e nome do array (items) insere os items a lista correpondenrte, pelo DOM.
function populateDatalist(datalist, items) {
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        datalist.appendChild(option);
    });
}

//Método que Obtem o input no DOM,verifica se o valor corresponde a um item dentro do array
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

//Implementa o método validateInput, com o evento que ao modificar os campos de entrada, verifica se os valores são válidos
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