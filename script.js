"use strict";

(() => {
  const screenshots = [
    { name: "镜中镜中镜", alt: "镜中镜中镜：镜面与花瓣组成的空间谜题" },
    { name: "鲁班锁", alt: "鲁班锁：花朵方块与黄色、蓝色传送门组成的机关" },
    { name: "移形换影 二", alt: "移形换影 二：通过空间机关寻找花朵的关卡" },
    { name: "钥匙", alt: "钥匙：移动和组合方块，解开花园里的谜题" },
    { name: "俄罗斯方块", alt: "俄罗斯方块：不同形状的方块与花朵组成的空间关卡" },
  ].map((item, index) => ({
    ...item,
    src: `assets/games/spring-up/screenshot-${String(index + 1).padStart(2, "0")}.webp`,
  }));

  const stage = document.querySelector("[data-open-gallery]");
  const image = document.querySelector("#gallery-image");
  const caption = document.querySelector("#gallery-caption");
  const counter = document.querySelector("#gallery-counter");
  const thumbnails = [...document.querySelectorAll("[data-gallery-index]")];
  const dialog = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxCaption = document.querySelector("#lightbox-caption");
  let currentIndex = 0;

  function selectScreenshot(index) {
    currentIndex = (index + screenshots.length) % screenshots.length;
    const current = screenshots[currentIndex];
    image.src = current.src;
    image.alt = current.alt;
    caption.textContent = current.name;
    counter.textContent = `${currentIndex + 1} / ${screenshots.length}`;
    stage.href = current.src;
    stage.setAttribute("aria-label", `放大查看：${current.name}，游戏实机截图`);
    for (const [thumbnailIndex, thumbnail] of thumbnails.entries()) {
      thumbnail.setAttribute("aria-pressed", String(thumbnailIndex === currentIndex));
    }
    if (dialog.open) updateLightbox();
  }

  function updateLightbox() {
    const current = screenshots[currentIndex];
    lightboxImage.src = current.src;
    lightboxImage.alt = current.alt;
    lightboxCaption.textContent = `${current.name}，${currentIndex + 1} / ${screenshots.length}`;
  }

  for (const thumbnail of thumbnails) {
    thumbnail.addEventListener("click", () => selectScreenshot(Number(thumbnail.dataset.galleryIndex)));
  }

  stage.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== "function") return;
    event.preventDefault();
    dialog.showModal();
    updateLightbox();
    document.body.classList.add("has-lightbox");
  });

  document.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  document.querySelector(".lightbox__previous").addEventListener("click", () => selectScreenshot(currentIndex - 1));
  document.querySelector(".lightbox__next").addEventListener("click", () => selectScreenshot(currentIndex + 1));
  dialog.addEventListener("close", () => document.body.classList.remove("has-lightbox"));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      selectScreenshot(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
    }
  });

  // Leave vertical scrolling to the browser; only a clear horizontal swipe changes the image.
  let swipeStart = null;
  lightboxImage.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    swipeStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
    lightboxImage.setPointerCapture(event.pointerId);
  });
  lightboxImage.addEventListener("pointerup", (event) => {
    if (!swipeStart || event.pointerId !== swipeStart.id) return;
    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) selectScreenshot(currentIndex + (dx < 0 ? 1 : -1));
    swipeStart = null;
  });
  lightboxImage.addEventListener("pointercancel", () => { swipeStart = null; });
  document.querySelector("#copyright-year").textContent = String(new Date().getFullYear());
})();
