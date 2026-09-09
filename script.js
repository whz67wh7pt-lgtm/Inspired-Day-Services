// =========================================
// INSPIRE DAY SERVICE
// =========================================



// =========================================
// STOP BROWSER RESTORING OLD SCROLL POSITION
// =========================================

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}



// =========================================
// MOBILE MENU
// =========================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");


if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", function () {

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });

}



// =========================================
// GET ACTUAL HEADER HEIGHT
// =========================================

function getHeaderHeight() {

  const header = document.querySelector(".site-header");

  if (!header) {
    return 0;
  }

  return header.getBoundingClientRect().height;

}



// =========================================
// SCROLL TO SECTION
// =========================================

function goToSection(targetId) {

  const target = document.querySelector(targetId);

  if (!target) {
    return;
  }


  // HOME ALWAYS GOES TO ABSOLUTE TOP

  if (targetId === "#home") {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return;
  }


  const headerHeight = getHeaderHeight();

  const targetTop =
    target.getBoundingClientRect().top +
    window.scrollY;


  /*
    This positions the actual start of the section
    immediately underneath the sticky header.

    The section's own padding then gives the heading
    its normal breathing room.
  */

  const destination =
    targetTop - headerHeight;


  window.scrollTo({
    top: Math.max(destination, 0),
    behavior: "smooth"
  });

}



// =========================================
// ALL INTERNAL LINKS
// =========================================
//
// One handler controls:
//
// Header menu
// Footer menu
// Logo
// Enquire Now
// Explore Our Programme
// Any other # links
//

document.addEventListener("click", function (event) {

  const link = event.target.closest('a[href^="#"]');

  if (!link) {
    return;
  }


  const targetId = link.getAttribute("href");


  if (
    !targetId ||
    targetId === "#"
  ) {
    return;
  }


  if (!document.querySelector(targetId)) {
    return;
  }


  event.preventDefault();


  // Close mobile menu

  if (mainNav) {
    mainNav.classList.remove("open");
  }


  if (menuToggle) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  /*
    Wait until mobile menu/layout has finished closing
    before measuring the header.
  */

  requestAnimationFrame(function () {

    goToSection(targetId);

  });

});



// =========================================
// ALWAYS OPEN SITE AT TOP
// =========================================
//
// We deliberately do NOT retain #about, #team etc.
// in the URL. This prevents the site reopening
// halfway down the page after a refresh.
//

window.addEventListener("load", function () {

  if (window.location.hash) {

    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

  }


  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });

});



// Also handles browser back/forward cache

window.addEventListener("pageshow", function (event) {

  if (event.persisted) {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });

  }

});



// =========================================
// CURRENT YEAR
// =========================================

const currentYear = document.getElementById("currentYear");


if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}



// =========================================
// ENQUIRY FORM
// =========================================

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


      formMessage.style.display = "block";


      formMessage.textContent =
        "Thank you. Your enquiry form is working correctly. We just need to connect it to Inspire's email address before the site goes live.";


      enquiryForm.reset();

    }
  );

}
