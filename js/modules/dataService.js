// Armazena os dados em cache da função carregarDados()
const cacheDados = {};

// Função para carregar dados de um endpoint JSON
export async function loadData({
    endpointApi,
    propertyArrayApi,
    propertyMap,
    cacheName
    // endpointApi é o endpoint da API JSON 
    // propertyArrayApi é a propriedade que contém o array de dados
    // propertyMap é a propriedade a ser mapeada para o datalist
    // nomeCache é o nome do cache para armazenar os dados
}) {

    // Verifica se os dados já estão em cache
    try {
        if (!cacheDados[cacheName]) {
            const response = await fetch(endpointApi);
            if (!response.ok) throw new Error(`Falha ao carregar dados de ${endpointApi}`);
            const data = await response.json();
            cacheDados[cacheName] = data[propertyArrayApi];
        }

        // Retorna o array mapeado com a propriedade especificada
        return cacheDados[cacheName].map(item => item[propertyMap]);
    } catch (error) {
        console.error(`Erro ao carregar ${cacheName}:`, error);
        return [];
    }
}

export async function loadProduct() {
    return loadData({
        endpointApi: 'apis/produtos.json',
        propertyArrayApi: 'produtos',
        propertyMap: 'codigo',
        cacheName: 'produtos'
    });
}


export async function loadColor() {
    return loadData({
        endpointApi: 'apis/colors.json',
        propertyArrayApi: 'colors',
        propertyMap: 'nome',
        cacheName: 'colors'
    });
}
export async function loadSize() {
    return loadData({
        endpointApi: 'apis/sizes.json',
        propertyArrayApi: 'sizes',
        propertyMap: 'codigo',
        cacheName: 'sizes'
    });
}