var lastScrollTop = 0;
let timer = null;
const navbar = document.getElementById("menu");
window.addEventListener("scroll", function(){
    clearTimeout(timer);
    navbar.style.top = "0px"
    timer = setTimeout(function(){ // nascondi la barra se non si scolla per un secondo e mezzo e non si è a inizio home
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

    // la parte di funzione che segue serve ad attivare e disattivare i link nella navbar durabte lo scroll
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

function goTo(daAttivare) { // attiva il link cliccato della navbar e scrolla fino al div corrispondente
    const link = document.querySelector("nav a.active");
    link.classList.remove("active");
    document.getElementById(daAttivare).classList.add("active");
    
    const targetDiv = document.getElementById(daAttivare + "_Page");
    window.scrollTo({
        top: targetDiv.offsetTop,
    });
}
//TODO quando scorre verso l'alto la navbar resta ferma e quando scorre verso il basso sparisce. Deve restare ferma sempre
//TODO su mobile la navbar fa casino con gli hover