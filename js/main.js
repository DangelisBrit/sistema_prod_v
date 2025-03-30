import { generatePdf } from './modules/pdfGenerator.js';
import { validateInputs } from './modules/validator.js';

class ProductManager {
    constructor() {
        this.products = [];
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

        this.products.push({
            id: this.currentId++,
            nome: this.produtoInput.value.trim(),
            cor: this.corInput.value.trim()
        });

        this.renderTable();
        this.clearInputs();
    }

    renderTable() {
        this.tableBody.innerHTML = this.products.map(prod => `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.nome}</td>
                <td>${prod.cor}</td>
                <td class="action-cell">
                    <img src="imgs/edit.png" 
                         class="table-icon action-edit" 
                         title="Editar produto"
                         data-id="${prod.id}">
                    <img src="imgs/delete.png" 
                         class="table-icon action-delete" 
                         title="Excluir produto"
                         data-id="${prod.id}">
                </td>
            </tr>
        `).join('');
    }

    clearInputs() {
        this.produtoInput.value = '';
        this.corInput.value = '';
        this.produtoInput.focus();
    }

    handlePdfGeneration() {
        if (this.products.length === 0) {
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