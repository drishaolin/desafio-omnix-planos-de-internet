//-------------------SHOW OFFERS---------------------
function newElement(element, elementClass, text) {
    const e = document.createElement(element);
    e.className = elementClass;
    e.textContent = text;
    return e;
}

const formattedNumber = (n) => new Intl.NumberFormat("pt-br").format(n);
function showOffers() {
    document.getElementById("selected-address").innerText = localStorage.getItem("Address");
    for (const offer of offers.userData.offers) {
        const div = newElement("div", "offer-item");
        const h2 = newElement("h2", "offer-name", offer.name);
        const p = newElement("p", "offer-price", `R$ ${formattedNumber(offer.price)}`);
        const btn = newElement("button", "btn-secondary", "Adquira já!");
        div.appendChild(h2);
        div.appendChild(btn);
        div.appendChild(p);

        document.getElementById("offers-list").appendChild(div);
    }
}

//-------------------CEP SEARCH-----------------------

function mascaraCep() {
    var cep = document.getElementById("cep").value;
    if (cep.length === 5) {
        document.getElementById("cep").value = cep + "-";
    }
}

function limpaFormulárioCep() {
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
}

function meuCallback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById("endereco").value = conteudo.logradouro;
        document.getElementById("bairro").value = conteudo.bairro;
        document.getElementById("cidade").value = conteudo.localidade;
        document.getElementById("estado").value = conteudo.uf;
    } else {
        limpaFormulárioCep();
        alert("CEP não encontrado.");
    }
}

function pesquisaCep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, "");
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById("endereco").value = "...";
            document.getElementById("bairro").value = "...";
            document.getElementById("cidade").value = "...";
            document.getElementById("estado").value = "...";
            var script = document.createElement("script");
            //Sincroniza com o callback.
            script.src = "https://viacep.com.br/ws/" + cep + "/json/?callback=meuCallback";
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } else {
            limpaFormulárioCep();
            alert("Formato de CEP inválido.");
        }
    } else {
        //cep sem valor, limpa formulário.
        limpaFormulárioCep();
    }
}

//-----------------------ON FORM SUBMIT, GET FULL ADDRESS------------------------
function getFullAddress() {
    const fullAddress = `
    ${document.getElementById("endereco").value}, ${
        document.getElementById("numero-endereco").value
    } - ${document.getElementById("bairro").value}, ${document.getElementById("cidade").value} - ${
        document.getElementById("estado").value
    }
    `;
    localStorage.setItem("Address", fullAddress);
    window.open("../offers.html");
}
