AOS.init({ duration: 800, easing: "ease-out-cubic", once: true, offset: 50 });

const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const newTheme =
    html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () =>
  navbar.classList.toggle("scrolled", window.scrollY > 50)
);

const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");
mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const icon = mobileToggle.querySelector("i");
  icon.classList.toggle("bi-list");
  icon.classList.toggle("bi-x");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileToggle.querySelector("i").classList.add("bi-list");
    mobileToggle.querySelector("i").classList.remove("bi-x");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 100)
      current = section.getAttribute("id");
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
});

const scrollTop = document.getElementById("scrollTop");
window.addEventListener("scroll", () =>
  scrollTop.classList.toggle("visible", window.scrollY > 500)
);
scrollTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute("data-count"));
        let current = 0;
        const timer = setInterval(() => {
          current += count / 60;
          if (current >= count) {
            target.textContent = count + "+";
            clearInterval(timer);
          } else target.textContent = Math.floor(current) + "+";
        }, 25);
        counterObserver.unobserve(target);
      }
    });
  },
  { threshold: 0.5 }
);
counters.forEach((counter) => counterObserver.observe(counter));

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
