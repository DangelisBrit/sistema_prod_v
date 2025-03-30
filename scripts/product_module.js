class Produto {
    constructor() {
        this.id = 1;
        this.arrayProduto = [];
    } // Constroe o array que vai conter os produtos e inicia o id em 1

    salvar(){
        let produto = this.lerDados(); 

       if (this.validarCampos(produto)) {
        this.adicionar(produto);
        this.gerarPdf();
       } 

       this.listaTabela();
       this.cancelar();
    }
    // Le dados de InPut e seta ao produto
    // Valida se  os campos foram preenchidos pela função "validar campos"  e insere os dados no objeto produto 
    // Adiciona os produtos a tabela 
    // Limpa os campos de InPut

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = ""; 
        // Para não duplicar todo o array sempre q o usuario inserir um novo produto setamos o tbody como vazio, assim adicionando apenas o ultimo item inserido a tabela.
412
        for (let i = 0; i< this.arrayProduto.length; i++){
            let tr = tbody.insertRow(); 
            // Insere a linha

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();
            // Para cada elemento insere uma célula a linha 

            td_id.innerText = this.arrayProduto[i].id;
            td_produto.innerText = this.arrayProduto[i].nomeProduto;
            td_preco.innerText = this.arrayProduto[i].preco;
            // Insere os valores de td com valor i que corresponde a sua posoção no for do array

            td_id.classList.add('center'); // Adicionando a classe q centralisa o id na tabela pelo css

            let imgEdit = document.createElement('img'); 
            imgEdit.src = 'imgs/edit.png';

            let imgDelete = document.createElement('img'); 
            imgDelete.src = 'imgs/delete.png';
           // criamos o elemento imagem p imagem de edição e delete, setamos a localização dela em src.

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
            //adicionamos ela dentro da celula de ações da seguinte forma: <td> <img src='imgs/edit.png'> </td>
            td_acoes.classList.add('center');
        }
    }

    adicionar(produto) {
        this.arrayProduto.unshift(produto); 
        // Insere a o produto no inicio array de produtos 
        this.id++;  // Insere  o id de forma sequencial
    }

    lerDados() {
        let produto = {} // Cria o objeto produto
        produto.id = this.id; 

        var campoProduto = document.getElementById('produto').value;
        var campoPreco = document.getElementById('preco').value;

        produto.nomeProduto = campoProduto
        produto.preco = campoPreco
        // Define os elementos do objeto produto

        return produto;
    } 

    validarCampos(produto) {
        let msg = "";

        if(produto.nomeProduto == "") {
            msg += "- Informe o nome do produto \n";
        }

        if(produto.preco == "") {
            msg += "- Informe o preço do produto \n";
        }

        if (msg != "") {
            alert(msg);
            return false
        }
        

        return true;
        
        
    } //Cria a mensagem vazia e se os campos não forem preenchidos gera as mensagens necessarías

    gerarPdf() {
        const element = document.getElementById('pdf-content');
        
        // Configurações do PDF
        const opt = {
            margin: 10,
            filename: 'op_.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };
        
        // Gerar PDF
        html2pdf().set(opt).from(element).save();
        }

        cancelar() {
            document.getElementById('produto').value = "";
            document.getElementById('preco').value = ""; 
        }

}
var produto = new Produto();


