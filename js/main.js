const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#menu");
const year = document.querySelector("#year");
const filters = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");
const empty = document.querySelector("#empty");
const dialog = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const lightboxTag = document.querySelector("#lightbox-tag");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxText = document.querySelector("#lightbox-text");

year.textContent = String(new Date().getFullYear());

const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    let visible = 0;
    cards.forEach((card) => {
      const show = filter === "todas" || card.dataset.cat === filter;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    empty.hidden = visible > 0;
  });
});

const openCard = (card) => {
  const image = card.querySelector("img");
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxTag.textContent = card.querySelector(".tag").textContent;
  lightboxTitle.textContent = card.querySelector("h3").textContent;
  lightboxText.textContent = card.querySelector(".card-body p:last-child").textContent;
  dialog.showModal();
};

cards.forEach((card) => {
  card.addEventListener("click", () => openCard(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCard(card);
    }
  });
});
