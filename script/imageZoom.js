// script/imageZoom.js
document.addEventListener("DOMContentLoaded", () => {
  const zoomFactor = 1.8; // reduzido para zoom suave
  const gallery = document.querySelector(".product-hero__gallery");
  if (!gallery) return;

  const container = gallery.querySelector(".main-image");
  const img = container.querySelector("#mainImage");

  // cria a lente
  const lens = document.createElement("div");
  lens.classList.add("img-zoom-lens");
  container.appendChild(lens);

  // atualiza fundo da lente usando dimensões exibidas
  function updateLensBackground() {
    const bgW = img.width * zoomFactor;
    const bgH = img.height * zoomFactor;
    lens.style.backgroundImage = `url('${img.src}')`;
    lens.style.backgroundSize = `${bgW}px ${bgH}px`;
  }

  // posição do cursor
  function getCursorPos(e) {
    const rect = img.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  // move a lente, centralizando no cursor
  function moveLens(e) {
    e.preventDefault();
    const { x, y } = getCursorPos(e);
    const halfW = lens.offsetWidth / 2;
    const halfH = lens.offsetHeight / 2;
    const posX = Math.max(halfW, Math.min(x, img.width - halfW));
    const posY = Math.max(halfH, Math.min(y, img.height - halfH));

    lens.style.left = `${posX - halfW}px`;
    lens.style.top = `${posY - halfH}px`;
    // background-position alinhada ao cursor
    lens.style.backgroundPosition = `-${posX * zoomFactor - halfW}px -${
      posY * zoomFactor - halfH
    }px`;
  }

  // eventos
  img.addEventListener("load", updateLensBackground);
  container.addEventListener("mouseenter", () => {
    updateLensBackground();
    lens.style.display = "block";
  });
  container.addEventListener("mouseleave", () => (lens.style.display = "none"));
  container.addEventListener("mousemove", moveLens);

  // ao trocar miniatura, atualiza fundo
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      img.addEventListener("load", updateLensBackground, { once: true });
    });
  });

  // inicializa caso imagem já carregada
  if (img.complete) updateLensBackground();
});
