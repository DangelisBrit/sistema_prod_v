import { generatePdf } from './modules/pdfGenerator.js';
import { validateInputs } from './modules/validator.js';

class ProductManager {
    constructor() {
        this.arrayProducts = [];
        this.currentId = 1;

        // Elementos DOM
        this.produtoInput = document.getElementById('produtoInput');
        this.corInput = document.getElementById('corInput');
        this.addBtn = document.getElementById('addBtn');
        this.pdfBtn = document.getElementById('pdfBtn');
        this.tableBody = document.getElementById('tableBody');
        this.produtoError = document.getElementById('produtoError');
        this.corError = document.getElementById('corError');

        // Eventos
        this.addBtn.addEventListener('click', () => this.addProduct());
        this.pdfBtn.addEventListener('click', () => this.handlePdfGeneration());

        this.produtoInput.focus();
    }

    addProduct() {
        if (!validateInputs(
            this.produtoInput,
            this.corInput,
            this.produtoError,
            this.corError
        )) return;

        this.arrayProducts.push({
            id: this.currentId++,
            nome: this.produtoInput.value.trim(),
            cor: this.corInput.value.trim()
        });

        this.renderTable();
        this.clearInputs();
    }

    renderTable() {
        let tbody = document.getElementById('tableBody');
        tbody.innerHTML = ""; // Usando innerHTML para limpar

        for (let i = 0; i < this.arrayProducts.length; i++) { // Corrigido o loop
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_cor = tr.insertCell(); // Renomeado para td_cor
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProducts[i].id;
            td_produto.innerText = this.arrayProducts[i].nome; // Corrigido para .nome
            td_cor.innerText = this.arrayProducts[i].cor; // Usando .cor em vez de .preco

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'imgs/edit.png';
            imgEdit.classList.add('action-icon'); // Adicione uma classe para estilização

            let imgDelete = document.createElement('img');
            imgDelete.src = 'imgs/delete.png';
            imgDelete.classList.add('action-icon');

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
            td_acoes.classList.add('center', 'action-cell'); // Adicionado action-cell
        }
    }

    clearInputs() {
        this.produtoInput.value = '';
        this.corInput.value = '';
        this.produtoInput.focus();
    }

    handlePdfGeneration() {
        if (this.arrayProducts.length === 0) { // Corrigida a condição
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

