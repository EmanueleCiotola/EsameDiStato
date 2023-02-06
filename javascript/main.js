var lastScrollTop = 0;
let timer = null;
const navbar = document.getElementById("menu");

// questa parte serve a non nascondere la navbar se il cursore è sopra di essa
//? cancellare questa parte (lasciando solo la riga 17) per tornare alla vecchia navbar
navbar.addEventListener("mouseover", function() {
    clearTimeout(timer);
});
navbar.addEventListener("mouseout", function() {
    // imposta un nuovo timer per nascondere la navbar dopo un secondo e mezzo che non ci si trova su di essa
    timer = setTimeout(function() {
        navbar.style.top = "-100px";
    }, 1.5 * 1000);
});
// questa parte nasconde la navbar se non si scolla per un secondo e mezzo e non si è all'inizio della home
window.addEventListener("scroll", function(){
    clearTimeout(timer);
    navbar.style.top = "0px";

    timer = setTimeout(function(){
        if (window.pageYOffset != 0) {
            navbar.style.top = "-100px";
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
})

function goTo(daAttivare) {
    const link = document.querySelector("nav a.active");
    link.classList.remove("active");

    const targetDiv = document.getElementById(daAttivare + "_Page");
    window.scroll({
        top: targetDiv.offsetTop,
    });

    document.getElementById(daAttivare).classList.add("active", "hover");

    window.addEventListener("scroll", function() { //evita che la classe hover venga lasciata attiva se si scrolla durante animazione
        link.classList.remove("hover");
        window.removeEventListener("scroll", this);
    });
}



//TODO quando il cursore passa all'altezza della scrollbar devi rimostrarla
//! (con vecchia navbar) quando scorre verso l'alto la navbar resta ferma e quando scorre verso il basso sparisce. Deve restare ferma sempre
//TODO su mobile la navbar fa casino con gli hover se tieni premuto ed evidenzia link del menu quando li premi



// var scrolling = false;
// var stopScrolling = false;

// function goTo(daAttivare) {
//     const link = document.querySelector("nav a.active");
//     link.classList.remove("active", "hover");
//     document.getElementById(daAttivare).classList.add("active", "hover");

//     const targetDiv = document.getElementById(daAttivare + "_Page");

//     scrolling = true;
//     window.scrollTo({
//         top: targetDiv.offsetTop,
//     });
// }

// window.addEventListener("scroll", function(){
//     if (scrolling && stopScrolling) {
//         // interrompere l'animazione di scorrimento
//         scrolling = false;
//         stopScrolling = false;
//         window.scrollTo(0, 0);
//         console.log("kad");
//     const link = document.querySelector("nav a.active");
//     link.classList.remove("hover");
//     }
// });

// // questa funzione interrompe l'animazione di scorrimento
// function stopGoTo() {
//     stopScrolling = true;
//     console.log("kad");
// }
