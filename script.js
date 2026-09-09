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

const root = document.documentElement;

const header =
  document.querySelector(".site-header");

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");



// =========================================
// MEASURE THE REAL HEADER HEIGHT
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



// Measure immediately

updateHeaderHeight();



// Measure again once everything has loaded

window.addEventListener(
  "load",
  updateHeaderHeight
);



// Update if browser width changes

window.addEventListener(
  "resize",
  updateHeaderHeight
);



// Automatically detect any header-size change

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
// CANCEL ANY EXISTING SMOOTH SCROLL
// =========================================

function cancelCurrentScroll() {

  /*
    A new immediate scroll to the page's current
    position interrupts any existing browser
    smooth-scroll animation.
  */

  window.scrollTo({
    top: window.scrollY,
    left: window.scrollX,
    behavior: "auto"
  });

}



// =========================================
// SCROLL TO A SECTION
// =========================================

function goToSection(targetId) {

  const target =
    document.querySelector(targetId);


  if (!target) {
    return;
  }


  updateHeaderHeight();

  cancelCurrentScroll();


  /*
    HOME goes to the absolute top rather
    than using scroll-margin.
  */

  if (targetId === "#home") {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    return;

  }


  /*
    scrollIntoView honours the CSS
    scroll-margin-top value.

    Because --header-height is measured
    dynamically, there are no guessed
    80px / 185px offsets.
  */

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });

}



// =========================================
// ALL INTERNAL LINKS
// =========================================
//
// This handles:
//
// Header navigation
// Footer Explore navigation
// Logo
// Enquire Now buttons
// Explore Our Programme button
// Any other future # section link
//

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


    /*
      Wait one frame so that if the mobile
      navigation has just closed, the browser
      can finish updating the layout first.
    */

    requestAnimationFrame(function () {

      updateHeaderHeight();

      goToSection(targetId);

    });


    /*
      Do NOT put #team / #about etc into the URL.

      This prevents the site reloading halfway
      down the page later.
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
// ALWAYS LOAD THE SITE AT THE TOP
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



// Normal page load

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



// Browser back / forward cache

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
// Temporary behaviour for the test site.
//
// We can connect the form to Inspire's
// receiving email address later.
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
