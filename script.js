var next1 = $("#Next1")

var name = $("#inptName")
var email = $("#inptEmail")
var phone = $("#inptPhone")

function ValidarEmail(email) {
    var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

function NextStep1() {
    console.log(phone.val());
}
