import { generatePdf } from './modules/pdfGenerator.js';
import { validateInputs } from './modules/inputConfigAndVerify.js';
import { setDataLinkInputs } from './modules/inputConfigAndVerify.js';

class ProductManager {
    constructor() {
        this.arrayProducts = [];
        this.currentId = 1;

        // Elementos DOM
        this.productInput = document.getElementById('productInput');
        this.colorInput = document.getElementById('colorInput');
        this.sizeInput = document.getElementById('sizeInput');
        this.addBtn = document.getElementById('addBtn');
        this.pdfBtn = document.getElementById('pdfBtn');
        this.tableBody = document.getElementById('tableBody');
        this.errorMessage = document.getElementById('errorMessage');

        // Eventos on click paraa adicionar produto e validador de pdf
        this.addBtn.addEventListener('click', () => this.addProduct());
        this.pdfBtn.addEventListener('click', () => this.handlePdfGeneration());

        this.productInput.focus();
        setDataLinkInputs();
    }

    addProduct() {
        if (!validateInputs(
            this.productInput,
            this.colorInput,
            this.sizeInput,
            this.errorMessage,
        )) return;

        this.arrayProducts.push({
            id: this.currentId++,
            nome: this.productInput.value.trim(),
            cor: this.colorInput.value.trim(),
            size: this.sizeInput.value.trim()

        });

        this.renderTable();
        this.clearInputs();
    }

    renderTable() {
        // Usando innerHTML para limpar a tabela para não inserir o array inteiro novamente sempre que um elemento é adicionado
        let tbody = document.getElementById('tableBody');
        tbody.innerHTML = "";

        // para cada produto no array de produtos adiciona 1 linha na tabela
        for (let i = 0; i < this.arrayProducts.length; i++) {
            // Criando as linhas do corpo da tabela
            let tr = tbody.insertRow();
            // Criando as células da linha
            let td_id = tr.insertCell();
            let td_product = tr.insertCell();
            let td_color = tr.insertCell();
            let td_size = tr.insertCell();
            let td_action = tr.insertCell();

            // Adicionando o conteúdo das células criadas na linha
            td_id.innerText = this.arrayProducts[i].id;
            td_product.innerText = this.arrayProducts[i].nome;
            td_color.innerText = this.arrayProducts[i].cor;
            td_size.innerText = this.arrayProducts[i].size;

            // Adicionando classes para estilização de centralização
            td_id.classList.add('center');

            // Adicionando imagens a variáveis para serem inseridas na célula
            let imgEdit = document.createElement('img');
            imgEdit.src = 'imgs/edit.png';
            imgEdit.classList.add('action-icon');

            let imgDelete = document.createElement('img');
            imgDelete.src = 'imgs/delete.png';
            imgDelete.classList.add('action-icon');

            // Adicionando a variável img à célula de ações
            td_action.appendChild(imgEdit);
            td_action.appendChild(imgDelete);
            td_action.classList.add('center', 'action-cell'); // Adicionado action-cell
        }
    }

    // Função para limpar os inputs
    clearInputs() {
        this.productInput.value = '';
        this.colorInput.value = '';
        this.sizeInput.value = '';
        this.productInput.focus();
    }

    // valida se o array está vazio para gerar o pdf e gera o alerta
    handlePdfGeneration() {
        if (this.arrayProducts.length === 0) {
            alert('Adicione produtos antes de gerar PDF!');
            return;
        }
        generatePdf();
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new ProductManager();
});