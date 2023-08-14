var plans = [false, false, false]
var adds = [false, false, false]

// Usadas para validar o step1
function ValidaEmail(email) {
    var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

function ValidaNome(nome) {
    if (nome == "") {
        return false
    } else {
        return true
    }
}

function ValidaPhone(telefone) {
    //retira todos os caracteres menos os numeros
    telefone = telefone.replace(/\D/g, '');

    //verifica se tem a qtde de numero correto
    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

    //Se tiver 11 caracteres, verificar se começa com 9 o celular
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

    //verifica se não é nenhum numero digitado errado (propositalmente)
    for (var n = 0; n < 10; n++) {
        //um for de 0 a 9.
        //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
        //caractere a ser repetido
        if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
    }
    //DDDs validos
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

    //  E por ultimo verificar se o numero é realmente válido. Até 2016 um celular pode
    //ter 8 caracteres, após isso somente numeros de telefone e radios (ex. Nextel)
    //vão poder ter numeros de 8 digitos (fora o DDD), então esta função ficará inativa
    //até o fim de 2016, e se a ANATEL realmente cumprir o combinado, os numeros serão
    //validados corretamente após esse período.
    //NÃO ADICIONEI A VALIDAÇÂO DE QUAIS ESTADOS TEM NONO DIGITO, PQ DEPOIS DE 2016 ISSO NÃO FARÁ DIFERENÇA
    //Não se preocupe, o código irá ativar e desativar esta opção automaticamente.
    //Caso queira, em 2017, é só tirar o if.
    if (new Date().getFullYear() < 2017) return true;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

    //se passar por todas as validações acima, então está tudo certo
    return true;
}
//Usadas para a mascara do celular
const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

//Usadas para retirar as mensagens de erro ao focar no campo
function removeErrorName() {
    $("#inptName").css("border-color", "hsl(231, 11%, 63%)");
    $("#errorName").addClass("d-none");
}

function removeErrorEmail() {
    $("#inptEmail").css("border-color", "hsl(231, 11%, 63%)");
    $("#errorEmail").addClass("d-none");
}

function removeErrorPhone() {
    $("#inptPhone").css("border-color", "hsl(231, 11%, 63%)");
    $("#errorPhone").addClass("d-none");
}

// Utilizada para estilizar os cartões ao clicar step2
function clickCard(card, cards) {
    $("#step2 p").addClass('d-none')
    clearSelected(cards)
    card.classList.toggle('cardActive');

    // Coloca todos os planos false
    for (var i = 0; i < 3; i++) {
        plans[i] = false
    }

    // set o plano escolhido para true
    plans[card.dataset.index] = true
}

function clearSelected(cards) {
    Array.from(cards.children).forEach(card => {
        card.classList.remove('cardActive')
    });
}

// Esconde/Mostra o bônus pela escolha do pagamento anual step2
function alterPay(check) {
    var cards = $(".card .YearlyPay")
    var monthly = $("#monthly")
    var yearly = $("#yearly")

    var Arc = $("#priceArc")
    var Adv = $("#priceAdv")
    var Pro = $("#pricePro")

    if (check.checked) {
        cards.fadeIn()
        //Cores
        monthly.css("color", "hsl(231, 11%, 63%)")
        yearly.css("color", "hsl(213, 96%, 18%)")

        Arc.text("$90/yr")
        Adv.text("$120/yr")
        Pro.text("$150/yr")
    } else {
        cards.fadeOut()
        //Cores
        monthly.css("color", "hsl(213, 96%, 18%)")
        yearly.css("color", "hsl(231, 11%, 63%)")

        Arc.text("$9/mo")
        Adv.text("$12/mo")
        Pro.text("$15/mo")
    }
}

// Valida se algum plano foi selecionado step2
function validaPlan() {
    for (var i = 0; i < 3; i++) {
        if (plans[i]) {
            return true;
        }
    }
    return false
}

// Ativa/desativa adicionais do plano step3 
function activeAdd(add) {
    // console.log($(".add"));
    var check = add.firstElementChild
    add.classList.toggle('cardActive')
    if (check.checked) {
        check.checked = false
        adds[add.dataset.index] = false
    } else {
        check.checked = true
        adds[add.dataset.index] = true
    }
}

// -----------------------------------------