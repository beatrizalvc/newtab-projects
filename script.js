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

function validarCadastro() {
    var nome = document.getElementById("nome-mercadoria").value;
    var valor = document.getElementById("valor-mercadoria").value;

    var alertaNome = document.getElementById("alerta-nome");
    var alertaValor = document.getElementById("alerta-valor");
    var alertaEnvio = document.getElementById("alerta-envio");

    var existeErro = false;
    var adicionaItem = [];


    if (nome == "") {
        alertaNome.innerHTML = "Preencha o nome";
        existeErro = true;
       
    }
    if (valor == "") {
        alertaValor.innerHTML = "Preencha o valor"
        existeErro = true;
    }

    if (nome !== "") {
        alertaNome.innerHTML = "";
        existeErro = false;
        


    }
    if (valor !== "") {
        alertaValor.innerHTML = ""
        existeErro = false;
    }

     if (nome !== "" & valor !== "") {
         alertaEnvio.innerHTML = "Item adicionado";
         document.getElementById("nome-mercadoria").value = "";
         document.getElementById("valor-mercadoria").value = "";

    }

    if (nome == "" || valor == "") {
        alertaEnvio.innerHTML = "";
    }


      

    
 
    if (nome !== "" & valor !== "") {
        document.getElementById("nome-mercadoria").value = "";
        document.getElementById("valor-mercadoria").value = "";

    }

}

/*FIM VALIDAÇÃODE FORMULÁRIO  E LOCAL STORAGE*/






