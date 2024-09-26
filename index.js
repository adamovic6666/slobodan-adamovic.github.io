document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  const sections = Array.from(document.querySelectorAll("section"));
  const OFFSET = 96;
  const SCROLL_OFFSET = 150;

  const setActiveLink = (link) => {
    navLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  };

  const handleNavClick = (event) => {
    event.preventDefault();
    const link = event.currentTarget;
    setActiveLink(link);

    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - OFFSET,
      behavior: "smooth",
    });
  };

  const handleNavHover = (event) => {
    const link = event.currentTarget;
    if (!link.classList.contains("active")) {
      link.classList.add("active-hover");
    }
  };

  const handleNavMouseOut = (event) => {
    event.currentTarget.classList.remove("active-hover");
  };

  const handleScroll = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - SCROLL_OFFSET) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick);
    link.addEventListener("mouseover", handleNavHover);
    link.addEventListener("mouseout", handleNavMouseOut);
  });

  window.addEventListener("scroll", handleScroll);

  // Set the initial active link
  setActiveLink(navLinks[0]);
});

// gradient background
const glow = document.getElementById("glow");

document.addEventListener("mousemove", (event) => {
  const { clientX: x, clientY: y } = event;

  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  glow.style.left = `${x + scrollX - glow.offsetWidth / 2}px`;
  glow.style.top = `${y + scrollY - glow.offsetHeight / 2}px`;
});
