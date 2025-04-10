// dataService.js
const cacheDados = {};

export async function carregarDados({ 
    endpoint, 
    propriedadeArray, 
    propriedadeMapear, 
    nomeCache 
}) {
    try {
        if (!cacheDados[nomeCache]) {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error(`Falha ao carregar dados de ${endpoint}`);
            const data = await response.json();
            cacheDados[nomeCache] = data[propriedadeArray];
        }
        
        // Retorna o array mapeado com a propriedade especificada
        return cacheDados[nomeCache].map(item => item[propriedadeMapear]);
    } catch (error) {
        console.error(`Erro ao carregar ${nomeCache}:`, error);
        return [];
    }
}

// Versão específica para produtos (mantendo compatibilidade)