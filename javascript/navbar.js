const navbar = document.getElementById("menu");
let currentNavSectionIndex = 0;
let currentSectionIndex = 0;
let timer = null;
let mouseOverNavbar = false;
let isScrolling = false;

// esegui un controllo posizione mouse solo su dispositivi non touch
if (!("ontouchstart" in window)) {
  // questa parte serve a non nascondere la navbar se il cursore è sopra di essa
  navbar.addEventListener("mouseover", () => {
    mouseOverNavbar = true;
    clearTimeout(timer);
  });

  // imposta un timer per nascondere la navbar dopo un secondo e mezzo che non ci si trova su di essa
  navbar.addEventListener("mouseout", () => {
    mouseOverNavbar = false;
    timer = setTimeout(() => {
      if (window.pageYOffset != 0) {
        navbar.style.top = -navbar.clientHeight + "px";
      }
    }, 1500);
  });
}

// nascondi scrollbar un secondo e mezzo dopo scroll e modifica navbar
function scrolling() {
  clearTimeout(timer);
  navbar.style.top = "0px";
  if (!mouseOverNavbar) { // prima di nascondere la navbar dopo lo scroll controlla che il mouse non si trovi sopra di essa (evita bug non movimento mouse quando appare la navbar)
    timer = setTimeout(() => {
      if (window.pageYOffset != 0) {
        navbar.style.top = -navbar.clientHeight + "px";
      }
    }, 1500);
  }
  
  // questa parte serve ad attivare e disattivare i link nella navbar durante lo scroll (sia scroll automatico sia manuale)
  const navSections = document.querySelectorAll("#home_Page, #educazione_civica_Page, #pcto_Page, #materie_Page");
  const navLinks = document.querySelectorAll("#home, #educazione_civica, #pcto, #materie");
  navSections.forEach((section, index) => {
    if (window.pageYOffset + (document.body.scrollHeight * 0.02) >= section.offsetTop) { // il "+ (document.body.scrollHeight * 0.02)" serve a dare un po' di tolleranza
      currentNavSectionIndex = index;
    }
  });
  navLinks.forEach((link, index) => {
    if (index === currentNavSectionIndex) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // questa parte serve per aggiungere la modalità light alla scrollbar nelle sezioni a sfondo chiaro
  const sections = document.querySelectorAll("#home_Page, #fotoRicordi, #educazione_civica_Page, #pcto_Page, #materie_Page");
  sections.forEach((section, index) => {
    if (window.pageYOffset >= section.offsetTop) { //TODO pcto_Page viene portata a 1px in meno al dovuto e quindi non si attiva light
      currentSectionIndex = index;
    }
  });
  navbar.classList.toggle("light", currentSectionIndex === 1 || currentSectionIndex === 3);
}

// questa parte aggiunge i listener (per scroll e scroll su mobile) e gestisce lo scroll per non far laggare l'animazione
function handleScroll() {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(() => {
      scrolling();
      isScrolling = false;
    });
  }
}
window.addEventListener("scroll", handleScroll);
window.addEventListener("touchmove", handleScroll);

// questa parte serve ad andare alla pagina voluta dopo aver cliccato sulla navbar
function goTo(daAttivare) {
  const targetSection = document.getElementById(daAttivare + "_Page");
  if (targetSection.id == "home_Page") { // evita bug scorrimento 1px in meno causato dal padding non fisso nelle section
    window.scroll({
      top: targetSection.offsetTop,
    });
  } else {
    window.scroll({
      top: targetSection.offsetTop + 1,
    });
  }
}