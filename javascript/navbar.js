var lastScrollTop = 0;
let timer = null;
let mouseOverNavbar = false;
const navbar = document.getElementById("menu");

// questa parte serve a non nascondere la navbar se il cursore è sopra di essa
//? cancellare questa parte (lasciando solo la riga 22) per tornare alla vecchia navbar
navbar.addEventListener("mouseover", function() {
    mouseOverNavbar = true;
    clearTimeout(timer);
});
navbar.addEventListener("mouseout", function() {
    // imposta un nuovo timer per nascondere la navbar dopo un secondo e mezzo che non ci si trova su di essa
    mouseOverNavbar = false;
    timer = setTimeout(function() {
        if (window.pageYOffset != 0) { //window.pageYOffset != document.getElementById("educazione_civica_Page").offsetTop
            navbar.style.top = - navbar.clientHeight + "px";
        }
    }, 1.5 * 1000);
});

// questa parte nasconde la navbar se non si scolla per un secondo e mezzo e non si è all'inizio della home
window.addEventListener("scroll", function(){
    clearTimeout(timer);
    navbar.style.top = "0px";
    if (!mouseOverNavbar) { // prima di nascondere la navbar dopo lo scroll controlla che il mouse non si trovi sopra di essa (evita bug non movimento mouse quando appare la navbar)
        timer = setTimeout(function(){
            if (window.pageYOffset != 0) { //window.pageYOffset != document.getElementById("educazione_civica_Page").offsetTop
                navbar.style.top = - navbar.clientHeight + "px";
            }
        }, 1.5 * 1000);
    }

    //? nascondi la barra se si scorre in basso e mostrala se si scorre in alto. Rinascondila se non si scorre per 5 secondi
    // clearTimeout(timer);
    // var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // if (scrollTop > lastScrollTop) {
    //     navbar.style.top = - navbar.clientHeight + "px"; // nascondi la navbar
    // } else {
    //     navbar.style.top = "0px"; // mostra la navbar
    // }
    // lastScrollTop = scrollTop;
    // timer = setTimeout(function() { // nascondi la navbar se non si scrolla per 5 secondi e non si è all'inizio della home
    //     if (lastScrollTop != 0) {
    //         navbar.style.top = - navbar.clientHeight + "px";
    //     }
    // }, 5 * 1000);

    // questa parte serve ad attivare e disattivare i link nella navbar durante lo scroll (sia scroll automatico sia manuale)
    const sections = document.querySelectorAll("#home_Page, #educazione_civica_Page, #materie_Page");
    const navLinks = document.querySelectorAll("#home, #educazione_civica, #materie");
    for (let i = 0; i < 3; i++) {
        const section = sections[i];
        if (window.pageYOffset + (document.body.scrollHeight * 0.02) >= section.offsetTop) { // il "+ (document.body.scrollHeight * 0.02)" serve a dare un po' di tolleranza
          currentSectionIndex = i;
        }
    }
    navLinks[currentSectionIndex].classList.add("active");
    for (let i = 0; i < navLinks.length; i++) {
        if (i !== currentSectionIndex) {
            navLinks[i].classList.remove("active");
        }
    }
});



function goTo(daAttivare) {    
    const targetSection = document.getElementById(daAttivare + "_Page");
    window.scroll({
        top: targetSection.offsetTop, 
    });
}

// function goTo(daAttivare) {
//     document.getElementById(daAttivare).classList.add("hover");
    
//     // questa parte aggiunge rimuove hover se la transizione termina normalmente
//     const targetSection = document.getElementById(daAttivare + "_Page");
//     let animationEnded = false;
//     targetSection.addEventListener("transitionend", function() {
//         animationEnded = true;
//         document.getElementById(daAttivare).classList.remove("hover");
//         targetSection.removeEventListener("transitionend", this);
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
    
//     window.scrollTo({top: targetSection.offsetTop});
// }