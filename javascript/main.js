// questa funzione serve a determinare se gli items osservati sono sullo schermo (utile per animazioni)
var elementiDaOsservare = document.querySelectorAll('.osservato');
var callback = function(items) {
    items.forEach((item) => {
        var position = item.target.getBoundingClientRect();
        if (item.isIntersecting) {
            item.target.classList.add("mostrato");
        } else if (position.top > 0) { // rimuove la classe mostrato solo se l'item si trova nella parte non visibile superiore dello schermo
            item.target.classList.remove("mostrato");
        }
    });
}
var observer = new IntersectionObserver(callback, {threshold: 0.3});
elementiDaOsservare.forEach((element) => {
    observer.observe(element);
});



//TODO su mobile la navbar fa casino con gli hover
//TODO il colore della navbar fa casino
//TODO su mobile la navbar non viene più nascosta dopo che si è premuto un bottone. Penso che onhover resti bloccato