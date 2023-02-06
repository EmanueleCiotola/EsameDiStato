var lastScrollTop = 0;
let timer = null;
const navbar = document.getElementById("menu");

// questa parte serve a non nascondere la navbar se il cursore è sopra di essa
//? cancellare questa parte (lasciando solo la riga 19) per tornare alla vecchia navbar
navbar.addEventListener("mouseover", function() {
    clearTimeout(timer);
    console.log("InizioOver");
});
navbar.addEventListener("mouseout", function() {
    // imposta un nuovo timer per nascondere la navbar dopo un secondo e mezzo che non ci si trova su di essa
    timer = setTimeout(function() {
        if (window.pageYOffset != 0) {
            navbar.style.top = "-100px";
            console.log("FineOver");
        }
    }, 1.5 * 1000);
});
// questa parte nasconde la navbar se non si scolla per un secondo e mezzo e non si è all'inizio della home
window.addEventListener("scroll", function(){
    clearTimeout(timer);
    navbar.style.top = "0px";
    console.log("InizioScroll");

    timer = setTimeout(function(){
        if (window.pageYOffset != 0) {
            navbar.style.top = "-100px";
            console.log("FineScroll");
        }
    }, 1.5 * 1000); 

    //? nascondi la barra se si scorre in basso e mostrala se si scorre in alto. Rinascondila se non si scorre per 5 secondi
    // clearTimeout(timer);
    // var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // if (scrollTop > lastScrollTop) {
    //     navbar.style.top = "-100px"; // nascondi la navbar
    // } else {
    //     navbar.style.top = "0px"; // mostra la navbar
    // }
    // lastScrollTop = scrollTop;
    // timer = setTimeout(function() { // nascondi la navbar se non si scrolla per 5 secondi e non si è all'inizio della home
    //     if (lastScrollTop != 0) {
    //         navbar.style.top = "-100px";
    //     }
    // }, 5 * 1000);

    // questa parte serve ad attivare e disattivare i link nella navbar durante lo scroll
    const divs = document.querySelectorAll("#home_Page, #educazione_civica_Page, #materie_Page");
    const navLinks = document.querySelectorAll("#home, #educazione_civica, #materie");
    for (let i = 0; i < 3; i++) {
        const div = divs[i];
        if (window.pageYOffset + (document.body.scrollHeight * 0.02) >= div.offsetTop) { // il "+ (document.body.scrollHeight * 0.02)" serve a dare un po' di tolleranza
          currentDivIndex = i;
        }
    }
    navLinks[currentDivIndex].classList.add("active");
    for (let i = 0; i < navLinks.length; i++) {
        if (i !== currentDivIndex) {
            navLinks[i].classList.remove("active");
        }
    }
});

function goTo(daAttivare) {    
    const targetDiv = document.getElementById(daAttivare + "_Page");
    window.scroll({
        top: targetDiv.offsetTop,
    });
}

// function goTo(daAttivare) {
//     document.getElementById(daAttivare).classList.add("hover");
    
//     // questa parte aggiunge rimuove hover se la transizione termina normalmente
//     const targetDiv = document.getElementById(daAttivare + "_Page");
//     let animationEnded = false;
//     targetDiv.addEventListener("transitionend", function() {
//         animationEnded = true;
//         document.getElementById(daAttivare).classList.remove("hover");
//         targetDiv.removeEventListener("transitionend", this);
//     });
    
//     // questa parte rimuove hover se la transizione viene interrotta con scroll manuale
//     new Promise(resolve => {
//         let previousY = window.pageYOffset;
//         const handleScroll = setInterval(() => {
//             const currentY = window.pageYOffset;
//             if (previousY === currentY) { // se la posizione Y non è cambiata, significa che lo scorrimento è terminato
//                 resolve();
//                 clearInterval(handleScroll);
//             }
//             previousY = currentY;
//         }, 50);
//     }).then(() => {
//             animationEnded = true;
//             document.getElementById(daAttivare).classList.remove("hover");
//         })
//         .catch(() => {
//             // La Promise viene interrotta se c'è un errore o se viene chiamato il metodo `reject`
//             animationEnded = true;
//             document.getElementById(daAttivare).classList.remove("hover");
//         });
    
//     window.scrollTo({top: targetDiv.offsetTop});
// }



//TODO quando si scorre e si ha già il cursore sulla navbar questa non resta visibile
//! classe hover
//? quando il cursore passa all'altezza della scrollbar devi rimostrarla
//! (con vecchia navbar) quando scorre verso l'alto la navbar resta ferma e quando scorre verso il basso sparisce. Deve restare ferma sempre
//TODO su mobile la navbar fa casino con gli hover se tieni premuto ed evidenzia link del menu quando li premi