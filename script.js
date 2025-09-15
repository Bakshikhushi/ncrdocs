
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('carousel');
  const carouselTrack = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  const cards = carouselTrack.children;
  const cardWidth = 264; // 240px + 24px margin (w-60 + mx-3)
  const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
  const totalCards = cards.length;
  
  let currentIndex = 0;
  const maxIndex = Math.max(0, totalCards - visibleCards);

  function updateCarousel() {
    const translateX = -currentIndex * cardWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
    
    // Update button states
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  // Previous button
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Next button
  nextBtn.addEventListener('click', function() {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Auto-scroll functionality (optional)
  let autoScrollInterval;
  
  function startAutoScroll() {
    autoScrollInterval = setInterval(function() {
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    }, 4000); // Auto-scroll every 4 seconds
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Pause auto-scroll on hover
  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);

  // Touch/swipe support for mobile
  let startX = 0;
  let isDragging = false;

  carousel.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoScroll();
  });

  carousel.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
  });

  carousel.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) { // Minimum swipe distance
      if (diffX > 0 && currentIndex < maxIndex) {
        // Swipe left - next
        currentIndex++;
      } else if (diffX < 0 && currentIndex > 0) {
        // Swipe right - previous
        currentIndex--;
      }
      updateCarousel();
    }
    
    isDragging = false;
    startAutoScroll();
  });

  // Initialize
  updateCarousel();
  startAutoScroll(); // Comment this line if you don't want auto-scroll
});
