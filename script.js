// =========================================
// INSPIRE DAY SERVICE
// =========================================



// =========================================
// MOBILE MENU
// =========================================

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");


if (menuToggle && mainNav) {

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


  const navLinks =
    mainNav.querySelectorAll("a");


  navLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  });

}



// =========================================
// GET TRUE HEADER HEIGHT
// =========================================

function getHeaderHeight() {

  const header =
    document.querySelector(".site-header");


  if (!header) {
    return 0;
  }


  return header.getBoundingClientRect().height;

}



// =========================================
// SCROLL TO SECTION
// =========================================

function scrollToSection(
  target,
  targetId,
  smooth = true
) {

  if (!target) {
    return;
  }


  /*
    HOME is special.

    We want Home to return completely
    to the top of the website.
  */

  if (targetId === "#home") {

    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto"
    });

    return;

  }


  const headerHeight =
    getHeaderHeight();


  const targetTop =
    target.getBoundingClientRect().top +
    window.scrollY;


  /*
    Small extra gap so the section is never
    pressed directly against the bottom
    edge of the sticky header.

    Because we are subtracting the gap too,
    the section lands slightly LOWER
    on the screen.
  */

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
// INTERNAL NAVIGATION
// =========================================

const internalLinks =
  document.querySelectorAll('a[href^="#"]');


internalLinks.forEach(function (link) {

  link.addEventListener(
    "click",
    function (event) {

      const targetId =
        this.getAttribute("href");


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


      /*
        Allow the mobile navigation to close
        before measuring the final page position.
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

    }
  );

});



// =========================================
// HANDLE PAGE LOADED WITH A HASH
// =========================================
//
// Example:
// /Inspired-Day-Services/#team
//
// Browsers normally try to jump to the hash
// before our JavaScript knows the real sticky
// header height.
//
// We correct that once the page has loaded.
//

window.addEventListener(
  "load",
  function () {

    const targetId =
      window.location.hash;


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


    /*
      Small delay gives images / fonts / layout
      a moment to settle before measuring.
    */

    setTimeout(function () {

      scrollToSection(
        target,
        targetId,
        false
      );

    }, 100);

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
// This keeps the current test behaviour.
//
// The form is not yet emailing Inspire.
// We can connect that once we have the
// correct receiving email address.
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
