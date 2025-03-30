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