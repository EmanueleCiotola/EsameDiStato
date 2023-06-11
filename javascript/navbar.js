var lastScrollTop = 0;
let timer = null;
let mouseOverNavbar = false;
const navbar = document.getElementById("menu");

// questa parte serve a non nascondere la navbar se il cursore è sopra di essa
navbar.addEventListener("mouseover", function() {
    mouseOverNavbar = true;
    clearTimeout(timer);
});
// imposta un timer per nascondere la navbar dopo un secondo e mezzo che non ci si trova su di essa
navbar.addEventListener("mouseout", function() {
    mouseOverNavbar = false;
    timer = setTimeout(function() {
        if (window.pageYOffset != 0) {
            navbar.style.top = - navbar.clientHeight + "px";
        }
    }, 1.5 * 1000);
});

// imposta un timer per nascondere la navbar dopo un secondo e mezzo che non si scolla se non si è all'inizio della home
window.addEventListener("scroll", function(){
    clearTimeout(timer);
    navbar.style.top = "0px";
    if (!mouseOverNavbar) { // prima di nascondere la navbar dopo lo scroll controlla che il mouse non si trovi sopra di essa (evita bug non movimento mouse quando appare la navbar)
        timer = setTimeout(function() {
            if (window.pageYOffset != 0) {
                navbar.style.top = - navbar.clientHeight + "px";
            }
        }, 1.5 * 1000);
    }

    // questa parte serve ad attivare e disattivare i link nella navbar durante lo scroll (sia scroll automatico sia manuale)
    const navSections = document.querySelectorAll("#home_Page, #educazione_civica_Page, #pcto_Page, #materie_Page");
    const navLinks = document.querySelectorAll("#home, #educazione_civica, #pcto, #materie");
    for (let i = 0; i < 4; i++) {
        const section = navSections[i];
        if (window.pageYOffset + (document.body.scrollHeight * 0.02) >= section.offsetTop) currentNavSectionIndex = i; // il "+ (document.body.scrollHeight * 0.02)" serve a dare un po' di tolleranza
    }
    navLinks[currentNavSectionIndex].classList.add("active");
    for (let i = 0; i < navLinks.length; i++) {
        if (i !== currentNavSectionIndex) {
            navLinks[i].classList.remove("active");
        }
    }

    // questa parte serve per aggiungere la modalità light alla scrollbar nelle sezioni a sfondo chiaro
    const sections = document.querySelectorAll("#home_Page, #fotoRicordi, #educazione_civica_Page, #pcto_Page, #materie_Page");
    for (let i = 0; i < 5; i++) {
        const section = sections[i];
        if (window.pageYOffset >= section.offsetTop) {
            currentSectionIndex = i
            if (currentSectionIndex == 1 || currentSectionIndex == 3) {
                console.log("ora chiaro");
                navbar.classList.add("light");
            } else {
                navbar.classList.remove("light");
            }
        };
    }
});

// questa parte serve ad andare nella pagina voluta dopo aver cliccato sulla navbar
function goTo(daAttivare) {    
    const targetSection = document.getElementById(daAttivare + "_Page");
    window.scroll({
        top: targetSection.offsetTop, 
    });
}
