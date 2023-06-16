const navbar = document.getElementById("menu");
const navSections = document.querySelectorAll("#home_Page, #educazione_civica_Page, #pcto_Page, #materie_Page");
const navLinks = document.querySelectorAll("#home, #educazione_civica, #pcto, #materie");
const sections = document.querySelectorAll("#home_Page, #fotoRicordi, #educazione_civica_Page, #pcto_Page, #materie_Page");
let currentNavSectionIndex = 0;
let currentSectionIndex = 0;
let timer = null;
let mouseOverNavbar = false;
let isScrolling = false;

// non nascondere navbar durante tocco o mousehover
function preventHiding() {
  mouseOverNavbar = true;
  clearTimeout(timer);
}

// nascondi navbar un secondo e mezzo dopo tocco o mouseout
function hideNavbar() {
  mouseOverNavbar = false;
  timer = setTimeout(() => {
    if (window.pageYOffset != 0) {
      navbar.style.top = -navbar.clientHeight + "px";
    }
  }, 1500);
}

// nascondi navbar un secondo e mezzo dopo scroll e modifica navbar
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
  navSections.forEach((section, index) => {
    if (window.pageYOffset + (document.body.scrollHeight * 0.02) >= section.offsetTop) { // il "+ (document.body.scrollHeight * 0.02)" serve a dare un po' di tolleranza
      currentNavSectionIndex = index;
    }
  });
  navLinks.forEach((link, index) => {
    link.classList.toggle("active", index === currentNavSectionIndex);
  });

  // questa parte serve per aggiungere la modalità light alla navbar nelle sezioni a sfondo chiaro
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

// esegui un controlli diversi su dispositivi touch e non touc
if (!("ontouchstart" in window)) {
  // questa parte serve a non nascondere la navbar se il cursore è sopra di essa
  navbar.addEventListener("mouseover", preventHiding, { passive: true });

  // imposta un timer per nascondere la navbar dopo un secondo e mezzo che non ci si trova su di essa
  navbar.addEventListener("mouseout", hideNavbar, { passive: true });
} else {
  // questa parte serve a non nascondere la navbar se si sta toccando (su dispositivi touch)
  navbar.addEventListener("touchstart", preventHiding, { passive: true });

  // imposta un timer per nascondere la navbar dopo un secondo e mezzo che non si sta toccando (su dispositivi touch)
  navbar.addEventListener("touchend", hideNavbar, { passive: true });
}

// evita bug selezione e deselezione del testo con click sulla navbar
navbar.addEventListener("click", function(event) {
  // Impedisci la propagazione dell'evento click
  console.log("kfjk");
  event.preventDefault();
  window.getSelection()?.removeAllRanges();
});

// esegui controlli per richiamare funzione di scroll
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