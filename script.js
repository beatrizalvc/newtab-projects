/*INÍCIO MÁSCARA DO CAMPO VALOR*/
function verificaTecla(e) {
    e.preventDefault();
    console.log(e);
    if ("0123456789".indexOf(e.key) != -1) {
        document.querySelector('input[id="valor-mercadoria"]').value += e.key
        document.querySelector('input[name=valor]').value += e.key;
    }

}



/*FIM MÁSCARA DO CAMPO VALOR*/

/*INÍCIO VALIDAÇÃODE FORMULÁRIO  E LOCAL STORAGE*/

var existeErro = false;
var lista = [];
var valorReal;
var simbolo;
var valorFormato;

function validarCadastro() {

    var tipo = document.getElementById("transacoes").value;
    var nome = document.getElementById("nome-mercadoria").value;
    var valor = document.getElementById("valor-mercadoria").value;

    var alertaTransacao = document.getElementById("alerta-transacao");
    var alertaNome = document.getElementById("alerta-nome");
    var alertaValor = document.getElementById("alerta-valor");
    var alertaEnvio = document.getElementById("alerta-envio");
    

    var existeErro = false;
    var adicionaItem = [];

    if (tipo == " ") {
        alertaTransacao.innerHTML = "Selecione um  tipo";
        existeErro = true;
    }


    if (nome == "") {
        alertaNome.innerHTML = "Preencha o nome";
        existeErro = true;
       
    }

    if (valor == "") {
        alertaValor.innerHTML = "Preencha o valor"
        existeErro = true;
    }

    if (tipo !== " ") {
        alertaTransacao.innerHTML = " ";
        existeErro = false;
    }


    if (nome !== "") {
        alertaNome.innerHTML = "";
        existeErro = false;
    }


    if (valor !== "") {
        alertaValor.innerHTML = ""
        existeErro = false;
    }

   
    if (valor !== "" && nome !== "" && tipo !== " ") {

        if (lista == null) {
            lista = [];
        }

        valor = parseFloat(valor)

        valorFormato = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        if (tipo == "Compra") {
            simbolo = "-";
            valorReal = valor * -1;
        } else if (tipo == "Venda") {
            simbolo = "+";
            valorReal = valor;
        }

       
        


        lista.push({ tipo: tipo, nome: nome, valor: valorFormato, valorReal: valorReal, simbolo: simbolo });
        localStorage.setItem('lista', JSON.stringify(lista));

        document.getElementById("transacoes").value = " ";
        document.getElementById("nome-mercadoria").value = "";
        document.getElementById("valor-mercadoria").value = "";

    
        window.location.reload();

    }

    return false
    
}

/*FIM VALIDAÇÃODE FORMULÁRIO  E LOCAL STORAGE*/


/*INÍCIO POPULAR TABELA*/

function listarDados() {
    lista = JSON.parse(localStorage.getItem('lista'))
    console.log("LISTA POPULADA", lista);

    document.getElementById("lista").innerHTML = " ";

    var total = 0;
    var lucroPrejuizo = document.getElementById("lucro-prejuizo")
    
    for (let idx_aln in lista) {      
        total += parseFloat(lista[idx_aln].valorReal);
        document.getElementById('lista').innerHTML +=
            `<tr class="tr-border" >
                <td>` + lista[idx_aln].simbolo + `</td >
                <td>` + lista[idx_aln].nome + `</td>
                <td class="tr-right">` + lista[idx_aln].valor + `</td>
            </tr>`

    }

    document.getElementById('footer').innerHTML +=
    `<td class="tr-right" id="td-footer">  R$ ` + total + `</td>`

        if (total > 0) {
            lucroPrejuizo.innerHTML = "[LUCRO]"
        } else {
            lucroPrejuizo.innerHTML = "[PREJUIZO]"
        }

   
}




/*FIM POPULAR TABELA*/

/*INÍCIO LIMPAR TABELA*/
   
   function LimparDados(){
       if (confirm("deletar dados?")) {
           lista = [];
           localStorage.setItem('lista', JSON.stringify(lista))
           listarDados()

       }

   }

/*FIM LIMPAR TABELA*/


listarDados()