// =========================================
// INSPIRE DAY SERVICE
// =========================================


// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });


  const navLinks = mainNav.querySelectorAll("a");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


// CURRENT YEAR

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


// ENQUIRY FORM
//
// This currently demonstrates the form working on the test site.
// We will connect this to the real Inspire email address afterwards.

const enquiryForm = document.getElementById("enquiryForm");
const formMessage = document.getElementById("formMessage");

if (enquiryForm && formMessage) {

  enquiryForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!enquiryForm.checkValidity()) {
      enquiryForm.reportValidity();
      return;
    }

    formMessage.style.display = "block";

    formMessage.textContent =
      "Thank you. Your enquiry form is working correctly. We just need to connect it to Inspire's email address before the site goes live.";

    enquiryForm.reset();

  });

}
