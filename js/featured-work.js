/* ========================================
   Wynklo - Interactive Tab-Slider Controller
   ======================================== */

export function initFeaturedWork() {
  const container = document.querySelector('#featured-work');
  if (!container) return;

  const tabs = container.querySelectorAll('.slider-tab');
  const details = container.querySelectorAll('.slider-detail-pane');
  const panels = container.querySelectorAll('.slider-panel');
  const track = container.querySelector('.featured-slider-track');
  const progressBar = container.querySelector('.slider-progress-bar');
  const prevBtn = container.querySelector('.slider-arrow.prev');
  const nextBtn = container.querySelector('.slider-arrow.next');

  if (!track || tabs.length === 0) return;

  let currentIndex = 0;
  const totalSlides = tabs.length;
  let autoplayTimer = null;

  function goToSlide(index) {
    // Keep index in bounds
    if (index < 0) {
      index = totalSlides - 1;
    } else if (index >= totalSlides) {
      index = 0;
    }

    currentIndex = index;

    // 1. Move track (4 slides total, each takes 25% of the 400% track width)
    const offset = index * 25;
    track.style.transform = `translateX(-${offset}%)`;

    // 2. Toggle active tab styling
    tabs.forEach((tab, idx) => {
      if (idx === index) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // 3. Toggle active detail texts
    details.forEach((detail, idx) => {
      if (idx === index) {
        detail.classList.add('active');
      } else {
        detail.classList.remove('active');
      }
    });

    // 4. Toggle active visual panel state
    panels.forEach((panel, idx) => {
      if (idx === index) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // 5. Update bottom slider progress bar
    if (progressBar) {
      progressBar.style.width = `${((index + 1) / totalSlides) * 100}%`;
    }
  }

  // Bind direct tab clicking
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
  });

  // Bind arrow click controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    });
  }

  // Autoplay function
  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 7000); // 7s interval
  }

  function resetAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }
    startAutoplay();
  }

  // Start autoplay immediately
  startAutoplay();

  // Pause autoplay on mouse hovering the visual viewport
  const rightPanel = container.querySelector('.featured-slider-right');
  if (rightPanel) {
    rightPanel.addEventListener('mouseenter', () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    });
    rightPanel.addEventListener('mouseleave', () => {
      startAutoplay();
    });
  }
}
