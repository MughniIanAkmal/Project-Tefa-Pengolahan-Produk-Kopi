function initFadeInUpAnimations() {
  const animateElements = document.querySelectorAll('.animate-fade-in-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animateElements.forEach(element => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
  });
}

// Run when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFadeInUpAnimations);
} else {
  initFadeInUpAnimations();
}