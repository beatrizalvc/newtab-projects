/*INÍCIO MÁSCARA DO CAMPO VALOR*/

function verificaTecla(e) {
    e.preventDefault();
    console.log(e);
    if ("0123456789".indexOf(e.key) != -1) {
        document.querySelector('input[id="valor-mercadoria"]').value += e.key
       
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

        listarDados();
        // window.location.reload();

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

    let tdTotal = document.getElementById('total');
    tdTotal.innerHTML = `<strong>R$ ` + total + `</strong>`;


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
       listarDados();

   }

/*FIM LIMPAR TABELA*/

/* INÍCIO SALVAR DADOS NO SERVIDOR */

const aluno = "2461"; //identificador do aluno - 4 ultimos números do cpf
function salvarServidor() {
      fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico", {
        headers: {
            Authorization: "Bearer key2CwkHb0CKumjuM"
        }
    })
        .then((response) => { return response.json() })
        .then((responseJson) => {
            exist = responseJson.records.filter((record) => {
                if (aluno == record.fields.Aluno) {
                    return true
                }
                return false
            })
            if (exist.length == 0) { 
                creat() 
            } else { 
                update(exist[0].id) 
            }
        })
};

/* FIM SALVAR DADOS NO SERVIDOR */

/* INÍCIO CRIAR SERVIDOR */

function creat() {
    let listaJson = JSON.stringify(lista);
    fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico", {
        method: "POST",
        headers: {
            Authorization: "Bearer key2CwkHb0CKumjuM",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "records": [
                {
                    "fields": {
                        "Aluno": aluno,
                        "Json": listaJson
                    }
                }
            ]
        })
    })
}

/* FIM CRIAR SERVIDOR */

/* INÍCIO ATUALIZAR DADO NO SERVIDOR */

function update(id) {
    let listaJson = JSON.stringify(lista);
    fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico", {
        method: "PATCH",
        headers: {
            Authorization: "Bearer key2CwkHb0CKumjuM",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "records": [
                {
                    "id": id,
                    "fields": {
                        "Aluno": aluno,
                        "Json": listaJson
                    }
                }
            ]
        })
    })
}

/* FIM ATUALIZAR DADO NO SERVIDOR */