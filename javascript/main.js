// questa funzione serve a determinare se gli items osservati sono sullo schermo (utile per animazioni)
var elementiDaOsservare = document.querySelectorAll('.osservato');
var callback = function(items) {
    items.forEach((item) => {
        if (item.isIntersecting) {
            item.target.classList.add("mostrato");
        } else {
            item.target.classList.remove("mostrato");
        }
    });
}
var observer = new IntersectionObserver(callback, {threshold: 0.8});
elementiDaOsservare.forEach((element) => {
    observer.observe(element);
});



//! classe hover da attivare o disattivare
//? quando il cursore passa all'altezza della scrollbar devi rimostrarla
//! (con vecchia navbar) quando scorre verso l'alto la navbar resta ferma e quando scorre verso il basso sparisce. Deve restare ferma sempre
//TODO su mobile la navbar fa casino con gli hover se tieni premuto ed evidenzia link del menu quando li premi