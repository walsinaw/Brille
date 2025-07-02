const prompt = require("prompt-sync")()
const fs = require("fs")

const produtos = []
const marcas = []
const categorias = []
const disponibilidades = []
const precos = []
const fotos = []

function titulo(texto){
    console.log();
    console.log(texto.toUpperCase());
    console.log("=".repeat(40));
    console.log();    
}

function inclusao() {
    titulo("Inclusão de Produtos")

    const produto         = prompt("Produto...:    ")
    const marca           = prompt("Marca.....:    ")
    const categoria       = prompt("Categoria.:    ")
    const disponibilidade = prompt("Disponível?    ")
    const preco           = Number(prompt("Preço R$...:   "))
    const foto            = prompt("URL da Foto:   ")

    produtos.push(produto)
    marcas.push(marca)
    categorias.push(categoria)
    disponibilidades.push(disponibilidade)
    precos.push(preco)
    fotos.push(foto)

    console.log("Obrigada! O item foi cadastrado com sucesso :)");
}

function listagem(){
    titulo("Lista de Produtos")

    console.log("Nº Nome........: Marca........: Categoria......: Disponível........: Preço R$");
    console.log("-----------------------------------------------------------------------------------");
    
    for (let i = 0; i < produtos.length; i++) {
        console.log(`${String(i+1).padStart(2)} ${produtos[i].padEnd(20)} ${marcas[i].padEnd(15)} ${categorias[i].padEnd(15)} ${disponibilidades[i].padEnd(10)} ${precos[i].toFixed(2).padStart(8)}`);
    }
    
    console.log("-----------------------------------------------------------------------------------");
}

function pesquisaCategoria() {
    titulo("Pesquisa de Produtos por Categoria")

    const categoriaPesq = prompt("Categoria:    ").toUpperCase()

    console.log("Produto..........: Marca:...........: Disponível.........: Preço R$");
    console.log("------------------------------------------------------------------------");

    let existe = 0

    for (let i = 0; i < produtos.length; i++) {
        if (categorias[i].toUpperCase() == categoriaPesq){
            console.log(`${produtos[i].padEnd(20)} ${marcas[i].padEnd(15)} ${disponibilidades[i].padEnd(10)} ${precos[i].toFixed(2).padStart(8)}`);
            existe++
        }
    }

    if (existe == 0) {
        console.log("Ops! Não encontramos nenhum produto nesta categoria");
    }

    console.log("------------------------------------------------------------------------");
}

function exclusao() {
    listagem()

    console.log();
    const num = Number(prompt("Qual o número do produto que deseja excluir? (0 para cancelar) "))
    
    if (num == 0 || num > produtos.length){
        console.log("Nenhum produto excluído.")
        return
    }

    produtos.splice(num-1, 1)
    marcas.splice(num-1, 1)
    categorias.splice(num-1, 1)
    disponibilidades.splice(num-1, 1)
    precos.splice(num-1, 1)
    fotos.splice(num-1, 1)

    console.log("Produto removido com sucesso!");
}

function gravaProdutos() {
    const mercadorias = []

    for (let i = 0; i < produtos.length; i++){
        mercadorias.push(produtos[i]+";"+marcas[i]+";"+categorias[i]+";"+disponibilidades[i]+";"+precos[i]+";"+fotos[i])
    }

    fs.writeFileSync("produtos.txt", mercadorias.join("\n"))

    console.log("Feito! Lista de produtos salva com sucesso")
}

function carregaProdutos(){
    if (fs.existsSync("produtos.txt")){ 
        const mercadorias = fs.readFileSync("produtos.txt", "utf-8").split("\n")

        for (let i = 0; i < mercadorias.length; i++){
            if (mercadorias[i].trim() === "") continue; 

            const partes = mercadorias[i].split(";")

            produtos.push(partes[0])
            marcas.push(partes[1])
            categorias.push(partes[2])
            disponibilidades.push(partes[3])
            precos.push(Number(partes[4]))
            fotos.push(partes[5])
        }
    }
}

function produtosWeb(){
    let conteudo = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Brillé - Catálogo</title>
<style>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
    }
    header {
        background-color: #f7d7e5;
        padding: 20px;
        text-align: center;
        color: #8b004e;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
        margin: 0;
        font-size: 32px;
    }
    main {
        padding: 30px;
    }
    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        border-radius: 0 0 10px 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(139, 0, 78, 0.2);
    }
    th {
        background-color: #fce8f1;
        color: #4d002a;
        padding: 15px;
        text-align: left;
        font-size: 16px;
        border-bottom: 2px solid #e5bfd3;
    }
    td {
        padding: 12px 15px;
        border-bottom: 1px solid #f2d6e3;
        font-size: 15px;
    }
    tr:hover {
        background-color: #fff7fa;
    }
    img {
        max-width: 60px;
        max-height: 60px;
        border-radius: 6px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
    footer {
        margin-top: 40px;
        text-align: center;
        color: #aaa;
        font-size: 14px;
        padding-bottom: 20px;
    }
</style>
</head>
<body>

<header>
    <h1>Brillé: Catálogo de Produtos</h1>
</header>

<main>
<table>
    <thead>
        <tr>
            <th>Produto</th>
            <th>Marca</th>
            <th>Categoria</th>
            <th>Disponibilidade</th>
            <th>Preço R$</th>
            <th>Foto</th>
        </tr>
    </thead>
    <tbody>`

    for(let i = 0; i < produtos.length; i++){
        conteudo += `
        <tr>
            <td>${produtos[i]}</td>
            <td>${marcas[i]}</td>
            <td>${categorias[i]}</td>
            <td>${disponibilidades[i]}</td>
            <td>${precos[i].toLocaleString("pt-br", {minimumFractionDigits: 2})}</td>
            <td><img src="${fotos[i]}" alt="Foto do Produto"></td>
        </tr>`            
    }

    conteudo +=
    `
    </tbody>
</table>
</main>

<footer>
    © 2025 Brillé | Todos os direitos reservados
</footer>

</body>
</html>`

    fs.writeFileSync("layout.html", conteudo)
    console.log("Catálogo gerado com sucesso.")
}

carregaProdutos()

menuPrincipal:
do{
    titulo("Brillé")
    console.log("1. Inclusão de Produto")
    console.log("2. Listagem de Produtos")
    console.log("3. Pesquisa por Categoria")
    console.log("4. Catálogo Web")
    console.log("5. Excluir Item do Catálogo")
    console.log("6. Finalizar")
    const opcao = Number(prompt("Opção: "))

    switch (opcao) {
        case 1:
            inclusao()
            break
        case 2:
            listagem()
            break        
        case 3:
            pesquisaCategoria()
            break        
        case 4:
            produtosWeb()
            break        
        case 5:
            exclusao()
            break        
        case 6:
        default:
            break menuPrincipal           
    }
} while (true)

gravaProdutos()    

console.log("-".repeat(40))
console.log("Fim do Programa...")
