var next1 = $("#Next1");

var next2 = $("#Next2");
var back2 = $("#back2");

var nome = $("#inptName");
var email = $("#inptEmail");
var phone = $("#inptPhone");

var errorName = $("#errorName")
var errorEmail = $("#errorEmail")
var errorPhone = $("#errorPhone")

var step1 = $("#step1")
var step2 = $("#step2")
var step3 = $("#step3")
var step4 = $("#step4")
var step5 = $("#step5")

var mark1 = $(".mark1")
var mark2 = $(".mark2")
var mark3 = $(".mark3")
var mark4 = $(".mark4")

// boolean (yearly/monthly)
var payment

var auxName, auxEmail, auxPhone;

function NextStep1() {

    auxName = ValidaNome(nome.val())
    auxEmail = ValidaEmail(email.val())
    auxPhone = ValidaPhone(phone.val())

    if (auxName && auxEmail && auxPhone) {
        // Passa para o próximo passo
        step1.hide()
        step2.show()
        mark1.removeClass('activeStep')
        mark2.addClass('activeStep')
    } else {
        // Erro
        if (!auxName) {
            errorName.removeClass('d-none')
            nome.css("border-color", "hsl(354, 84%, 57%)")
        }
        if (!auxEmail) {
            errorEmail.removeClass('d-none')
            email.css("border-color", "hsl(354, 84%, 57%)")
        }
        if (!auxPhone) {
            errorPhone.removeClass('d-none')
            phone.css("border-color", "hsl(354, 84%, 57%)")
        }
    }
}

// ------------------------------------------------------------------
// ------------------------------------------------------------------
function NextStep2() {
    // Checka se algum plano foi selecionado
    if (!validaPlan()) {
        $("#step2 p").removeClass('d-none')
        return
    }

    step3.show()
    step2.hide()
    mark3.addClass('activeStep')
    mark2.removeClass('activeStep')

    // Recupera o valor do input checkbox
    payment = document.getElementById("toggle").checked

    if (payment) {
        $(".add .priceAdd").text("+$20/yr")
        $(".add #prcOnlineService").text("+$10/yr")
    } else {
        $(".add .priceAdd").text("+$2/mo")
        $(".add #prcOnlineService").text("+$1/mo")
    }
}

function Back2() {
    step1.show()
    step2.hide()
    mark1.addClass('activeStep')
    mark2.removeClass('activeStep')
}
// ------------------------------------------------------------------
// ------------------------------------------------------------------
function NextStep3() {
    step4.show()
    step3.hide()
    mark4.addClass('activeStep')
    mark3.removeClass('activeStep')

    clearAdds()
    showPlan()
}

function Back3() {
    step2.show()
    step3.hide()
    mark2.addClass('activeStep')
    mark3.removeClass('activeStep')
}
// ------------------------------------------------------------------
// ------------------------------------------------------------------
function NextStep4() {
    mark4.removeClass('activeStep')
}

function Back4() {
    step3.show()
    step4.hide()
    mark3.addClass('activeStep')
    mark4.removeClass('activeStep')
}

function ChangePlan() {
    step2.show()
    step4.hide()
    mark2.addClass('activeStep')
    mark4.removeClass('activeStep')
}
