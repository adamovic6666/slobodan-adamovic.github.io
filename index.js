document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  const sections = Array.from(document.querySelectorAll("section"));
  const OFFSET = 100;
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
  // apply only on desktop
  if (window.innerWidth < 1024) return;
  const { clientX: x, clientY: y } = event;

  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  let left = x + scrollX - glow.offsetWidth / 2;
  let top = y + scrollY - glow.offsetHeight / 2;

  // Ensure the glow element stays within the viewport
  const maxLeft = document.documentElement.scrollWidth - glow.offsetWidth;
  const maxTop = document.documentElement.scrollHeight - glow.offsetHeight;

  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left > maxLeft) left = maxLeft;
  if (top > maxTop) top = maxTop;

  glow.style.left = `${left}px`;
  glow.style.top = `${top}px`;
});
