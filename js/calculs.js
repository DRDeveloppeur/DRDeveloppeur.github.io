function age(date) {
    var diff = Date. now() - date. getTime();
    var age = new Date(diff);
    var monAge = Math. abs(age. getUTCFullYear() - 1970);
    $('.myAge').replaceWith("<h2>Bonjour,  je m’appelle <br> <span> Delianu Raul </span> et j’ai " + monAge + " ans.</h2>")
}
function nbrCoffees(d1, d2) {
    d1 = d1.getTime() / 86400000;
    d2 = d2.getTime() / 86400000;
    var total = new Number(d2 - d1).toFixed(0);
    $('.coffee').attr('data-num', total);
}
function nbrHours(d1, d2) {
    d1 = d1.getTime() / 86400000;
    d2 = d2.getTime() / 86400000;
    var total = new Number(d2 - d1).toFixed(0);
    $('.hours').attr('data-num', (total*5));
}
$(function () {
    nbrCoffees(new Date('16 March 2018'), new Date());
    nbrHours(new Date('16 March 2018'), new Date());
    age(new Date(1994, 11, 17));
});
