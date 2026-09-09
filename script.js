// =========================================
// INSPIRE DAY SERVICE
// =========================================



// =========================================
// STOP BROWSER RESTORING AN OLD POSITION
// =========================================

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}



// =========================================
// MAIN ELEMENTS
// =========================================

const root =
  document.documentElement;

const header =
  document.querySelector(".site-header");

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");



// =========================================
// MEASURE REAL HEADER HEIGHT
// =========================================

function updateHeaderHeight() {

  if (!header) {
    return;
  }


  const height =
    Math.ceil(
      header.getBoundingClientRect().height
    );


  root.style.setProperty(
    "--header-height",
    `${height}px`
  );

}


updateHeaderHeight();


window.addEventListener(
  "load",
  updateHeaderHeight
);


window.addEventListener(
  "resize",
  updateHeaderHeight
);



if (
  header &&
  "ResizeObserver" in window
) {

  const headerObserver =
    new ResizeObserver(function () {

      updateHeaderHeight();

    });


  headerObserver.observe(header);

}



// =========================================
// MOBILE MENU
// =========================================

if (
  menuToggle &&
  mainNav
) {

  menuToggle.addEventListener(
    "click",
    function () {

      const isOpen =
        mainNav.classList.toggle("open");


      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    }
  );

}



// =========================================
// CLOSE MOBILE MENU
// =========================================

function closeMobileMenu() {

  if (mainNav) {
    mainNav.classList.remove("open");
  }


  if (menuToggle) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}



// =========================================
// CANCEL CURRENT SCROLL
// =========================================

function cancelCurrentScroll() {

  window.scrollTo({
    top: window.scrollY,
    left: window.scrollX,
    behavior: "auto"
  });

}



// =========================================
// GO TO SECTION
// =========================================

function goToSection(targetId) {

  const target =
    document.querySelector(targetId);


  if (!target) {
    return;
  }


  updateHeaderHeight();

  cancelCurrentScroll();


  if (targetId === "#home") {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    return;

  }


  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });

}



// =========================================
// ALL INTERNAL LINKS
// =========================================

document.addEventListener(
  "click",
  function (event) {

    const link =
      event.target.closest('a[href^="#"]');


    if (!link) {
      return;
    }


    const targetId =
      link.getAttribute("href");


    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);


    if (!target) {
      return;
    }


    event.preventDefault();


    closeMobileMenu();


    requestAnimationFrame(function () {

      updateHeaderHeight();

      goToSection(targetId);

    });


    /*
      Remove any section hash from the URL.
      This stops the page reopening halfway down.
    */

    if (window.location.hash) {

      history.replaceState(
        null,
        "",
        window.location.pathname +
        window.location.search
      );

    }

  }
);



// =========================================
// ALWAYS LOAD AT TOP
// =========================================

function resetPagePosition() {

  if (window.location.hash) {

    history.replaceState(
      null,
      "",
      window.location.pathname +
      window.location.search
    );

  }


  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });

}



window.addEventListener(
  "load",
  function () {

    updateHeaderHeight();

    setTimeout(
      resetPagePosition,
      0
    );

  }
);



window.addEventListener(
  "pageshow",
  function (event) {

    updateHeaderHeight();


    if (event.persisted) {

      setTimeout(
        resetPagePosition,
        0
      );

    }

  }
);



// =========================================
// CURRENT YEAR
// =========================================

const currentYear =
  document.getElementById("currentYear");


if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}



// =========================================
// ENQUIRY FORM
// =========================================
//
// Still test behaviour at this stage.
// We'll connect it to Formspree afterwards.
//

const enquiryForm =
  document.getElementById("enquiryForm");

const formMessage =
  document.getElementById("formMessage");


if (
  enquiryForm &&
  formMessage
) {

  enquiryForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      if (!enquiryForm.checkValidity()) {

        enquiryForm.reportValidity();

        return;

      }


      formMessage.style.display =
        "block";


      formMessage.textContent =
        "Thank you. Your enquiry form is working correctly. We just need to connect it to Inspire's email address before the site goes live.";


      enquiryForm.reset();

    }
  );

}
