// Remove no-js class if JavaScript is enabled
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// 1. Scroll-scrubbed Hero Video (Optimized for Smoothness)
(() => {
  const video = document.querySelector(".hero-video");
  const heroScrub = document.querySelector(".hero-scrub");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const lines = [
    document.querySelector(".hero-title-line-1"),
    document.querySelector(".hero-title-line-2"),
    document.querySelector(".hero-title-line-3"),
    document.querySelector(".hero-title-line-4")
  ];

  if (!video || !heroScrub) return;

  let targetProgress = 0;
  let currentProgress = 0;
  let isVideoReady = false;

  const getHeroProgress = () => {
    const rect = heroScrub.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const scrollable = Math.max(1, rect.height - viewportHeight);
    const raw = (-rect.top) / scrollable;
    return Math.max(0, Math.min(1, raw));
  };

  // Initial State
  video.pause();
  video.removeAttribute("autoplay");
  video.muted = true;

  // Smoothing loop
  const update = () => {
    const lerpFactor = 0.1;
    currentProgress += (targetProgress - currentProgress) * lerpFactor;

    if (video.duration && !video.seeking) {
      const targetTime = currentProgress * video.duration;
      if (Math.abs(video.currentTime - targetTime) > 0.04) {
        video.currentTime = targetTime;
      }
    }

    if (scrollIndicator) {
      scrollIndicator.classList.toggle("visible", currentProgress < 0.15);
    }

    lines.forEach((line, i) => {
      if (!line) return;
      const start = 0.2 + (i * 0.2);
      const end = start + 0.2;
      const isVisible = (currentProgress >= start && currentProgress < end) || (i === 3 && currentProgress >= 0.8);
      line.classList.toggle("visible", isVisible);
    });

    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", () => {
    targetProgress = getHeroProgress();
  }, { passive: true });

  requestAnimationFrame(update);

  const heroBrand = document.querySelector(".hero-brand");
  const TARGET_PHRASE = "Get Nifty";
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
  const WORDS = ["IMPRESSION", "PERCEPTION", "PROFIT", "MOMENTUM", "NIFTY", "LEVEL UP", "STRATEGY"];
  const NUMBERS = ["777", "1010", "444", "0101", "888", "1337"];
  const GREEN = "var(--green)";

  let animationState = {
    frame: 0,
    startTime: Date.now(),
    solvedCount: 0,
    isBufferingEnough: false,
    flashingWords: true,
    flashIndex: 0,
    flashTimer: 0
  };

  const updateHeroAnimation = () => {
    if (!heroBrand) return;

    // Wait for VIDEO to be ready
    if (!animationState.isBufferingEnough) {
      if (video.readyState >= 3) {
        if (Date.now() - animationState.startTime > 1200) {
          animationState.isBufferingEnough = true;
        }
      }
      if (Date.now() - animationState.startTime > 5000) animationState.isBufferingEnough = true;
    }

    if (animationState.flashingWords) {
      animationState.flashTimer++;
      animationState.flashIndex++;
      if (animationState.flashIndex > 5 && animationState.isBufferingEnough) {
        animationState.flashingWords = false;
      }
      const pool = animationState.flashIndex % 2 === 0 ? WORDS : NUMBERS;
      const word = pool[Math.floor(Math.random() * pool.length)];
      heroBrand.innerHTML = `<span style="color: #333; font-size: 0.8em; opacity: 0.5;">${word}</span>`;
      requestAnimationFrame(updateHeroAnimation);
      return;
    }

    let html = "";
    if (animationState.solvedCount < TARGET_PHRASE.length) {
      animationState.solvedCount++;
    }

    for (let i = 0; i < TARGET_PHRASE.length; i++) {
      if (i < animationState.solvedCount) {
        html += `<span style="color: ${GREEN}">${TARGET_PHRASE[i]}</span>`;
      } else {
        html += `<span style="color: #444">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`;
      }
    }

    heroBrand.innerHTML = html;

    if (animationState.solvedCount >= TARGET_PHRASE.length) {
      setTimeout(() => {
        heroBrand.innerHTML = TARGET_PHRASE;
        heroBrand.style.color = GREEN;
        const heroSticky = document.querySelector(".hero-sticky");
        if (heroSticky) heroSticky.classList.remove("loading");
      }, 200);
      return;
    }

    animationState.frame++;
    requestAnimationFrame(updateHeroAnimation);
  };

  if (heroBrand) {
    const heroSticky = document.querySelector(".hero-sticky");
    if (heroSticky) heroSticky.classList.add("loading");
    requestAnimationFrame(updateHeroAnimation);
  }

  const primeVideo = async () => {
    try {
      if (!isVideoReady) {
        await video.play();
        video.pause();
        isVideoReady = true;
      }
    } catch (e) { }
  };
  document.addEventListener("touchstart", primeVideo, { once: true, passive: true });
  document.addEventListener("mousedown", primeVideo, { once: true });

  video.load();
})();

// 2. Section Visibility Observer
(() => {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service, .process-steps li, .what-we-do, .how').forEach(t => observer.observe(t));
})();

// 3. Portfolio Carousel (Infinite + Dual Alignment + Precisely Centered)
(() => {
  const carousel = document.querySelector('.portfolio-carousel');
  const wrapper = document.querySelector('.portfolio-carousel-wrapper');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  const playFollower = document.getElementById('play-follower');

  if (!carousel || !prevBtn || !nextBtn || !playFollower) return;

  const itemsOriginal = Array.from(carousel.children);
  const itemCount = itemsOriginal.length;
  if (itemCount === 0) return;

  // Clone items for infinite look
  itemsOriginal.forEach(item => { carousel.appendChild(item.cloneNode(true)); });
  [...itemsOriginal].reverse().forEach(item => { carousel.prepend(item.cloneNode(true)); });

  let currentIndex = itemCount;
  let isAnimating = false;
  let isDragging = false;
  let startX = 0;
  let dragOffset = 0;
  let startTranslateX = 0;
  let dragThreshold = 5;
  let dragStarted = false;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let activeVideo = null;

  const getCarouselOffset = (index) => {
    const items = Array.from(carousel.children);
    if (!items.length) return 0;
    const gap = parseFloat(window.getComputedStyle(carousel).gap) || 30;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += items[i].offsetWidth + gap;
    }
    return offset;
  };

  const updateCarouselPos = (immediate = false) => {
    const items = Array.from(carousel.children);
    if (!items[currentIndex]) return;

    // Using double-frame delay ensures the browser has recalculated offsetWidth
    // after an aspect-ratio change, fixing the "not quite centered" issue.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const wrapperWidth = wrapper.offsetWidth;
        const itemWidth = items[currentIndex].offsetWidth;
        const isMobile = window.innerWidth <= 768;
        const isPlaying = items[currentIndex].classList.contains('playing');

        let targetX;
        if (isMobile || isPlaying) {
          // Center-aligned: Calculation is now based on stable DOM dimensions
          targetX = -getCarouselOffset(currentIndex) + (wrapperWidth / 2) - (itemWidth / 2);
        } else {
          // Desktop Browsing: Start-aligned
          targetX = -getCarouselOffset(currentIndex);
        }

        gsap.to(carousel, {
          x: targetX,
          duration: immediate ? 0 : 0.8,
          ease: "power3.out",
          onComplete: () => {
            isAnimating = false;
            // Infinite wrap
            if (currentIndex >= itemCount * 2) {
              currentIndex = itemCount;
              updateCarouselPos(true);
            } else if (currentIndex < itemCount) {
              currentIndex = itemCount * 2 - 1;
              updateCarouselPos(true);
            }
          }
        });
      });
    });
  };

  prevBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex--;
    updateCarouselPos();
  });

  nextBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    updateCarouselPos();
  });

  const onStart = (e) => {
    if (e.button !== 0 && e.button !== 1 && e.type !== 'touchstart') return;
    if (e.button === 1) e.preventDefault();

    isDragging = true;
    dragStarted = false;
    dragOffset = 0;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    lastX = startX;
    lastTime = Date.now();
    velocity = 0;

    const matrix = new DOMMatrix(getComputedStyle(carousel).transform);
    startTranslateX = matrix.m41;

    gsap.killTweensOf(carousel);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = x - startX;

    if (!dragStarted && Math.abs(diff) > dragThreshold) {
      dragStarted = true;
      carousel.classList.add('is-dragging');
      if (e.type === 'touchmove') e.preventDefault();
    }

    if (dragStarted) {
      dragOffset = diff;
      gsap.set(carousel, { x: startTranslateX + dragOffset });
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) velocity = (x - lastX) / dt;
      lastX = x;
      lastTime = now;
      if (e.type === 'touchmove') e.preventDefault();
    }
  };

  const onEnd = (e) => {
    if (!isDragging) return;
    isDragging = false;
    carousel.classList.remove('is-dragging');

    if (dragStarted) {
      const items = Array.from(carousel.children);
      const wrapperWidth = wrapper.offsetWidth;
      const currentVisualX = startTranslateX + dragOffset;
      const isMobile = window.innerWidth <= 768;

      let nearestIndex = 0;
      let minDiff = Infinity;

      items.forEach((item, idx) => {
        const isPlaying = item.classList.contains('playing');
        let snapX;
        if (isMobile || isPlaying) {
          snapX = -getCarouselOffset(idx) + (wrapperWidth / 2) - (item.offsetWidth / 2);
        } else {
          snapX = -getCarouselOffset(idx);
        }

        const diff = Math.abs(snapX - currentVisualX);
        if (diff < minDiff) {
          minDiff = diff;
          nearestIndex = idx;
        }
      });

      const isFlick = Math.abs(velocity) > 0.5;
      if (isFlick) {
        currentIndex = velocity > 0 ? currentIndex - 1 : currentIndex + 1;
      } else {
        currentIndex = nearestIndex;
      }

      dragOffset = 0;
      velocity = 0;
      isAnimating = true;
      updateCarouselPos();
    }
    setTimeout(() => { dragStarted = false; }, 50);
  };

  carousel.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);
  carousel.addEventListener('touchstart', onStart, { passive: true });
  carousel.addEventListener('touchmove', onMove, { passive: false });
  carousel.addEventListener('touchend', onEnd);

  window.addEventListener('resize', () => updateCarouselPos(true));
  window.addEventListener('load', () => updateCarouselPos(true));
  setTimeout(() => updateCarouselPos(true), 150);

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch) {
    let mX = 0, mY = 0, fX = 0, fY = 0;
    document.addEventListener('mousemove', (e) => { mX = e.clientX; mY = e.clientY; });
    const tick = () => {
      fX += (mX - fX) * 0.15;
      fY += (mY - fY) * 0.15;
      playFollower.style.transform = `translate(${fX - 40}px, ${fY - 40}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  } else {
    playFollower.style.display = 'none';
  }

  const pauseAllOthers = (currentVideo) => {
    document.querySelectorAll('video').forEach(v => {
      if (v !== currentVideo && !v.classList.contains('hero-video') && !v.paused) {
        v.pause();
        const item = v.closest('.portfolio-item');
        if (item) {
          item.classList.remove('playing');
          item.style.aspectRatio = '1/1';
        }
        v.closest('.brand-hub-preview')?.classList.remove('playing');
        if (v === activeVideo) activeVideo = null;
      }
    });
  };

  carousel.addEventListener('click', (e) => {
    if (dragStarted) return;
    const item = e.target.closest('.portfolio-item');
    if (!item) return;
    const video = item.querySelector('video');
    if (!video) return;

    if (activeVideo && activeVideo !== video) {
      activeVideo.pause();
      const prevItem = activeVideo.closest('.portfolio-item');
      if (prevItem) {
        prevItem.classList.remove('playing');
        prevItem.style.aspectRatio = '1/1';
      }
      activeVideo.closest('.brand-hub-preview')?.classList.remove('playing');
    }

    pauseAllOthers(video);

    if (video.paused) {
      currentIndex = Array.from(carousel.children).indexOf(item);
      video.muted = false;
      video.play();
      item.classList.add('playing');

      const updateDim = () => {
        if (video.videoWidth) {
          const ratio = video.videoWidth / video.videoHeight;
          item.style.aspectRatio = ratio.toFixed(4);
          // Kick the carousel animation immediately with the new known ratio
          updateCarouselPos();
          // And again after a small delay to catch the DOM settling
          setTimeout(updateCarouselPos, 100);
          setTimeout(updateCarouselPos, 300);
          setTimeout(updateCarouselPos, 600);
        }
      };

      if (video.readyState >= 1) updateDim();
      else video.addEventListener('loadedmetadata', updateDim, { once: true });

      playFollower.classList.add('playing');
      activeVideo = video;
    } else {
      video.pause();
      item.classList.remove('playing');
      item.style.aspectRatio = '1/1';
      playFollower.classList.remove('playing');
      activeVideo = null;
      updateCarouselPos();
    }
  });

  carousel.addEventListener('mouseenter', (e) => {
    const item = e.target.closest('.portfolio-item');
    if (item) {
      playFollower.classList.add('active');
      if (item.querySelector('video') === activeVideo && !activeVideo.paused) {
        playFollower.classList.add('playing');
      } else {
        playFollower.classList.remove('playing');
      }
    }
  }, true);

  carousel.addEventListener('mouseleave', (e) => {
    if (e.target.closest('.portfolio-item')) playFollower.classList.remove('active');
  }, true);

  const brandHub = document.querySelector('.brand-hub-preview');
  if (brandHub) {
    brandHub.addEventListener('mouseenter', () => playFollower.classList.add('active'));
    brandHub.addEventListener('mouseleave', () => playFollower.classList.remove('active'));
    brandHub.addEventListener('click', () => {
      const video = brandHub.querySelector('video');
      if (!video) return;
      pauseAllOthers(video);
      if (video.paused || video.muted) {
        video.muted = false;
        video.play();
        brandHub.classList.add('playing');
        activeVideo = video;
      } else {
        video.pause();
        brandHub.classList.remove('playing');
        activeVideo = null;
      }
    });
  }
})();

// 4. Hamburger menu logic
(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const header = document.querySelector(".landing-header");
  if (menuToggle && header) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isOpen);
      header.setAttribute("data-menu-open", !isOpen);
      document.body.style.overflow = isOpen ? "" : "hidden";
    });
  }
  // WhatsApp Popup
  const popup = document.getElementById('whatsapp-popup');
  const closeBtn = document.getElementById('whatsapp-close');
  if (popup && closeBtn) {
    setTimeout(() => popup.classList.add('active'), 10000);
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      popup.classList.remove('active');
    });
  }
})();
