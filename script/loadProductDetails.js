// productDetail.js

function loadProductDetail() {
  const productId = sessionStorage.getItem("selectedProductId");
  if (!productId) {
    window.location.href = "allProducts.html";
    return;
  }

  fetch("../data/products.json")
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao carregar produtos");
      return res.json();
    })
    .then((data) => {
      const produto = data.produtos.find((p) => p.id === productId);
      if (!produto) throw new Error("Produto não encontrado");
      displayProduct(produto);
    })
    .catch(() => {
      window.location.href = "allProducts.html";
    });
}

function displayProduct(p) {
  // Desenho Técnico
  const techCard = document
    .getElementById("technical-drawing")
    ?.closest(".details-card");
  if (techCard) {
    if (p.desenhoTecnico?.imagem) {
      techCard.style.display = "";
      document.getElementById("technical-drawing").innerHTML = `<li><img src="${
        p.desenhoTecnico.imagem
      }" alt="${p.desenhoTecnico.alt || p.titulo}"></li>`;
    } else {
      techCard.style.display = "none";
    }
  }

  // Meta & breadcrumb
  document.title = `${p.titulo} | X10 Forro PVC`;
  document.querySelector(".breadcrumb .current").textContent = p.titulo;

  // Hero
  document.querySelector(".category").textContent = p.categoria;
  document.querySelector(".product-hero__info h2").textContent = p.titulo;
  document.querySelector(".product-hero__info .description").textContent =
    p.descricao;

  // Main image
  const mainImg = document.getElementById("mainImage");
  mainImg.src = p.imagemPrincipal;
  mainImg.alt = p.titulo;

  // Miniaturas
  const thumbGrid = document.querySelector(".thumbnail-grid");
  thumbGrid.innerHTML = "";
  p.miniaturas.forEach((t, i) => {
    const btn = document.createElement("button");
    btn.className = `thumbnail${i === 0 ? " active" : ""}`;
    btn.setAttribute("data-img", t.imagem);
    btn.innerHTML = `<img src="${t.imagem}" alt="${t.alt}">`;
    btn.addEventListener("click", () => {
      mainImg.src = btn.getAttribute("data-img");
      thumbGrid.querySelector(".active")?.classList.remove("active");
      btn.classList.add("active");
    });
    thumbGrid.appendChild(btn);
  });

  // Características
  const feat = document.querySelector(".features");
  feat.innerHTML = "";
  p.caracteristicas.forEach((f) => {
    feat.innerHTML += `
      <div class="feature-item">
        <i class="bi bi-check-square-fill"></i>
        <div><h4>${f.titulo}</h4><p>${f.descricao}</p></div>
      </div>`;
  });

  // Especificações
  const specs = document.querySelector(".specs-list");
  specs.innerHTML = "";
  p.especificacoes.forEach((s) => {
    specs.innerHTML += `
      <li>
        <span class="spec-label">${s.rotulo}</span>
        <span class="spec-value">${s.valor}</span>
      </li>`;
  });

  // Aplicações
  const apps = document.querySelector(".applications-list");
  apps.innerHTML = "";
  p.aplicacoes.forEach((a) => {
    apps.innerHTML += `<li><i class="bi bi-check-square"></i><span>${a}</span></li>`;
  });

  // Vantagens
  const bens = document.querySelector(".benefits-list");
  bens.innerHTML = "";
  p.vantagens.forEach((b) => {
    bens.innerHTML += `<li><i class="bi bi-arrow-up-right-square"></i><span>${b}</span></li>`;
  });

  // Card Extra
  const extraCard = document
    .getElementById("additional-card")
    ?.closest(".details-card");
  if (extraCard) {
    if (p.cardExtra?.imagem) {
      extraCard.style.display = "";
      document.getElementById("additional-card").innerHTML = `<li><img src="${
        p.cardExtra.imagem
      }" alt="${p.cardExtra.alt || p.titulo}"></li>`;
    } else {
      extraCard.style.display = "none";
    }
  }

  // Guia de instalação
  const steps = document.querySelectorAll(".steps-grid .step-card");
  p.guiaInstalacao.forEach((s, i) => {
    if (!steps[i]) return;
    steps[i].querySelector(".step-number").textContent = s.passo;
    steps[i].querySelector("h4").textContent = s.titulo;
    steps[i].querySelector("p").textContent = s.descricao;
  });

  // WhatsApp
  const wa = document.querySelector(".cta-buttons .btn-primary");
  if (wa && p.linkWhatsapp) wa.href = p.linkWhatsapp;
}

function setupProductButtons() {
  document.querySelectorAll(".view-product-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-product-id");
      if (!id) return console.error("Faltando data-product-id no botão");
      sessionStorage.setItem("selectedProductId", id);
      window.location.href = "productDetail.html";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupProductButtons();
  // só carrega detalhe se tiver o elemento principal na página
  if (document.getElementById("mainImage")) {
    loadProductDetail();
  }
});
