function age(date) {
    var diff = Date. now() - date. getTime();
    var age = new Date(diff);
    var monAge = Math. abs(age. getUTCFullYear() - 1970);
    $('.myAge').replaceWith("<h2>Bonjour,  je m’appelle <br> <span> Delianu Raul </span> et j’ai " + monAge + " ans.</h2>")
}
$(function () {
    age(new Date(1994, 11, 17));
});
