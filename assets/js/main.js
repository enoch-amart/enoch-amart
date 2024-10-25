// Import EmailJS for handling email sending

// Initialize EmailJS with your user ID (you'll need to sign up at emailjs.com)

// Animation on scroll functionality
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

// Apply animations to different sections
sr.reveal(".home__content", {});
sr.reveal(".home__img", { delay: 600 });
// sr.reveal(".about__img", { delay: 600 });
sr.reveal(".about__content", { delay: 700 });
sr.reveal(".services__item", { interval: 100 });
sr.reveal(".work__card", { interval: 100 });
sr.reveal(".testimonials__item", { interval: 100 });
sr.reveal(".contact__details", { delay: 600 });
sr.reveal(".form__group", { delay: 700 });

// Navbar scroll animation
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
});

// Active link highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(`.nav__link[href*=${sectionId}]`)
        .classList.add("active-link");
    } else {
      document
        .querySelector(`.nav__link[href*=${sectionId}]`)
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

// Form validation and submission
const contactForm = document.querySelector(".contact__form");
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const subjectInput = document.querySelector('input[name="subject"]');
const messageInput = document.querySelector('textarea[name="message"]');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function sanitizeInput(input) {
  if (typeof input !== "string") return "";

  return input
    .replace(/[<>]/g, "") // Remove < and >
    .replace(/['"]/g, "") // Remove quotes entirely
    .replace(/[^a-zA-Z0-9\s.,!?@-]/g, "") // Only allow these characters
    .trim();
}

// Contact form handler with auto-reply
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validate and sanitize inputs
  const name = sanitizeInput(nameInput.value);
  const email = sanitizeInput(emailInput.value);
  const subject = sanitizeInput(subjectInput.value);
  const message = sanitizeInput(messageInput.value);

  // Input validation
  if (!name || name.length < 2) {
    alert("Please enter a valid name");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!message || message.length < 10) {
    alert("Please enter a message (minimum 10 characters)");
    return;
  }

  if (!subject || subject.length < 3) {
    alert("Please enter a valid subject");
    return;
  }

  // Show loading state
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  try {
    // Send notification email to you
    await emailjs.send("service_vuaz82n", "template_9skugny", {
      from_name: name, // Sender's name
      from_email: email, // Sender's email
      subject: subject, // Subject entered by the sender
      message: message, // Message content
      to_name: "Enoch", // Your name (notification recipient)
      to_email: "your-email@example.com", // Your email
    });

    // Clear form and show success message
    contactForm.reset();
    alert(
      "Message sent successfully! Please check your email for confirmation."
    );
  } catch (error) {
    console.error("Error sending message:", error);
    alert("There was an error sending your message. Please try again.");
  } finally {
    // Restore button state
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
});

// Mobile menu toggle
const navMenu = document.querySelector(".nav__menu");
const navToggle = document.querySelector(".nav__toggle");
const navClose = document.querySelector(".nav__close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// Skills progress animation
const skillsBars = document.querySelectorAll(".skills__percentage");
const animateSkills = () => {
  skillsBars.forEach((bar) => {
    const percentage = bar.style.width;
    bar.style.width = "0%";
    bar.animate([{ width: "0%" }, { width: percentage }], {
      duration: 1000,
      fill: "forwards",
      easing: "ease-out",
    });
  });
};

// Trigger skills animation when skills section is in view
const skillsSection = document.querySelector(".skills");
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateSkills();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

if (skillsSection) {
  observer.observe(skillsSection);
}
