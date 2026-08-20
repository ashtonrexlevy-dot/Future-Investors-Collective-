/* ==========================================================================
   Future Investors Collective — main.js
   Handles: mobile nav toggle, sticky header shadow, scroll reveal,
            active nav link, and the Get Started form.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------------------------------------------
     Mobile nav toggle
     ------------------------------------------------------------------ */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile menu when a nav link is clicked
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------
     Sticky header shadow on scroll
     ------------------------------------------------------------------ */
  var header = document.querySelector(".site-header");

  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------
     Scroll-reveal fade-in (respects prefers-reduced-motion)
     ------------------------------------------------------------------ */
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // No IntersectionObserver support or reduced motion: show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ------------------------------------------------------------------
     Get Started form: validation + submit handling
     ------------------------------------------------------------------ */
  var form = document.getElementById("interest-form");

  if (form) {
    var successMessage = document.getElementById("form-success");

    var validators = {
      name: function (value) {
        return value.trim().length > 0;
      },
      email: function (value) {
        // Simple, permissive email check
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      },
      role: function (value) {
        return value.trim().length > 0;
      },
    };

    function showError(field, show) {
      var errorEl = form.querySelector('[data-error-for="' + field + '"]');
      var inputEl = form.querySelector('[name="' + field + '"]');

      if (errorEl) {
        errorEl.classList.toggle("is-visible", show);
      }

      if (inputEl) {
        inputEl.classList.toggle("invalid", show);
        inputEl.setAttribute("aria-invalid", show ? "true" : "false");
      }
    }

    function validateForm() {
      var isValid = true;

      Object.keys(validators).forEach(function (field) {
        var inputEl = form.querySelector('[name="' + field + '"]');
        if (!inputEl) return;

        var fieldValid = validators[field](inputEl.value);
        if (!fieldValid) {
          isValid = false;
        }
        showError(field, !fieldValid);
      });

      return isValid;
    }

    /* ----------------------------------------------------------------
       OPTION A (default): Formspree submission
       ----------------------------------------------------------------
       This handler intercepts the submit, validates the fields, and if
       everything checks out, sends the data to Formspree via fetch so
       we can show our own success message without leaving the page.

       To enable: make sure the form's "action" attribute (in
       get-started.html) points to your real Formspree endpoint, e.g.
         https://formspree.io/f/abcd1234
       Replace REPLACE_WITH_FORMSPREE_ID with the ID Formspree gives you.
       ---------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateForm()) {
        var firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      var submitButton = form.querySelector('button[type="submit"]');
      var originalLabel = submitButton ? submitButton.textContent : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            if (successMessage) {
              successMessage.classList.add("is-visible");
              successMessage.setAttribute("tabindex", "-1");
              successMessage.focus();
            }
          } else {
            alert(
              "Something went wrong sending your message. Please try again or email us directly."
            );
          }
        })
        .catch(function () {
          alert(
            "Something went wrong sending your message. Please try again or email us directly."
          );
        })
        .finally(function () {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalLabel;
          }
        });
    });

    /* ----------------------------------------------------------------
       OPTION B (fallback): mailto submission
       ----------------------------------------------------------------
       If you'd rather not use Formspree, comment out the submit
       listener above and uncomment the block below. This opens the
       user's email client with a pre-filled message to Ashton instead
       of sending the form over the network.

       Remember to replace REPLACE_WITH_ASHTON_EMAIL with the real
       address in the mailto link below.
       ---------------------------------------------------------------- */
    /*
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateForm()) {
        var firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var role = form.querySelector('[name="role"]').value;
      var org = form.querySelector('[name="organization"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();

      var subject = "New FIC interest form submission";
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Role: " + role + "\n" +
        "School / Organization: " + org + "\n\n" +
        "Message:\n" + message;

      var mailtoLink =
        "mailto:REPLACE_WITH_ASHTON_EMAIL" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailtoLink;

      if (successMessage) {
        successMessage.classList.add("is-visible");
      }
    });
    */
  }

  /* ------------------------------------------------------------------
     Set aria-current="page" on the active nav link
     ------------------------------------------------------------------ */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
});
