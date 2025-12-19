// window.addEventListener("scroll", function () {
//   const parallax = document.querySelector(".parallax");
//   let scroll = window.pageYOffset;
// });
fetch("http://localhost:3000/imagens")
  .then(res => res.json())
  .then(dados => {
    const carousel = document.querySelector(".carousel-inner");
    let active = "active";

    dados.forEach(item => {
      carousel.innerHTML += `
        <div class="carousel-item ${active}">
          <img src="http://localhost:3000/uploads/${item.imagem}" class="d-block w-100">
        </div>`;
      active = "";
    });
  });
  // boton no topo
const btn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
if (window.scrollY > 300) {
btn.style.display = "flex";
} else {
btn.style.display = "none";
}
});


btn.addEventListener("click", () => {
window.scrollTo({ top: 0, behavior: "smooth" });
});

function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");

  elements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // para carregar elementos visíveis ao abrir a página
