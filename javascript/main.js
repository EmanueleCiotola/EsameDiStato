var lastScrollTop = 0;
navbar = document.getElementById("menu");
window.addEventListener("scroll", function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.style.top = "-100px"; // Nascondi la navbar
    } else {
        navbar.style.top = "0px"; // Mostra la navbar
    }
    lastScrollTop = scrollTop;

    // La parte di funzione che segue serve ad attivare e disattivare i link nella navbar durabte lo scroll
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