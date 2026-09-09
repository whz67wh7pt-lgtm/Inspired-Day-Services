// =========================================
// INSPIRE DAY SERVICE
// =========================================



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

function scrollToSection(target, targetId, smooth = true) {

  if (!target) {
    return;
  }


  // HOME ALWAYS RETURNS TO THE VERY TOP

  if (targetId === "#home") {

    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto"
    });

    return;
  }


  const headerHeight = getHeaderHeight();

  const targetTop =
    target.getBoundingClientRect().top +
    window.scrollY;


  // Small visual gap below sticky header

  const extraGap = 6;


  const destination =
    targetTop -
    headerHeight -
    extraGap;


  window.scrollTo({
    top: destination,
    behavior: smooth ? "smooth" : "auto"
  });

}



// =========================================
// ALL INTERNAL LINKS
// =========================================
//
// This works for:
//
// Header navigation
// Footer navigation
// Logo
// Enquire Now buttons
// Explore Our Programme
// Any future #section links
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


  const target = document.querySelector(targetId);


  if (!target) {
    return;
  }


  event.preventDefault();


  // Close mobile navigation if it is open

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
    Allow the mobile menu/layout to close
    before measuring the final header height.
  */

  requestAnimationFrame(function () {

    scrollToSection(
      target,
      targetId,
      true
    );

  });


  history.replaceState(
    null,
    "",
    targetId
  );

});



// =========================================
// HANDLE DIRECT LINKS WITH HASH
// =========================================
//
// Example:
//
// website/#team
// website/#contact
//

window.addEventListener("load", function () {

  const targetId = window.location.hash;


  if (
    !targetId ||
    targetId === "#"
  ) {
    return;
  }


  const target = document.querySelector(targetId);


  if (!target) {
    return;
  }


  setTimeout(function () {

    scrollToSection(
      target,
      targetId,
      false
    );

  }, 100);

});



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
// Temporary test behaviour until the form
// is connected to Inspire's actual email.
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


      formMessage.style.display = "block";


      formMessage.textContent =
        "Thank you. Your enquiry form is working correctly. We just need to connect it to Inspire's email address before the site goes live.";


      enquiryForm.reset();

    }
  );

}
