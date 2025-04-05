// dataService.js
let listaProdutos = [];

export async function carregarProdutos() {
    try {
        if (listaProdutos.length === 0) {
            const response = await fetch('apis/produtos.json');
            if (!response.ok) throw new Error('Falha ao carregar produtos');
            const data = await response.json();
            listaProdutos = data.produtos;
        }
        return listaProdutos;
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        return [];
    }
}

export function getCodigosProdutos() {
    return listaProdutos.map(produto => produto.codigo);
}

console.log(listaProdutos);