document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const h1 = document.querySelector('.carousel-heading');
  const modal = document.querySelector('.modal');
  const modalContent = modal ? modal.querySelector('.modal-content') : null;
  const modalClose = modal ? modal.querySelector('.modal-close') : null;
  const notification = document.querySelector('.notification');

  // Get all creator name links
  const creatorNames = document.querySelectorAll('.creator-name');

  // Map class to corresponding modal
  const creatorModals = {
    'marko': document.getElementById('modal-marko'),
    'filip': document.getElementById('modal-filip')
  };

  let imageClickedWhenCreatorOpen = false;

  function showSlide(n) {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === n);
      console.log(`Slide ${index} is ${index === n ? 'active' : 'inactive'}`);
    });
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === n);
    });

    const indicatorsContainer = document.querySelector('.indicators');
    if (indicatorsContainer && h1) {
      if (n === 3) {
        indicatorsContainer.classList.add('hidden');
        h1.classList.add('hidden');
      } else {
        indicatorsContainer.classList.remove('hidden');
        h1.classList.remove('hidden');
      }
    }
  }

  function updateBodyScroll() {
    const anyModalOpen = !modal.classList.contains('hidden') || 
      Object.values(creatorModals).some(m => !m.classList.contains('hidden'));
    document.body.classList.toggle('no-scroll', anyModalOpen);
  }

  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
      showSlide(slideIndex);
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      slideIndex = index;
      showSlide(slideIndex);
    });
  });

  // Image modal (zoomed image)
  document.querySelectorAll('.main-image, .main-image-wider, .main-image-shorter')
    .forEach(image => {
      image.addEventListener('click', () => {
        if (modalContent && modal) {
          modalContent.src = image.src;
          modal.classList.remove('hidden');
        }

        Object.values(creatorModals).forEach(m => m.classList.add('hidden'));
        if (notification) notification.classList.add('hidden');
        updateBodyScroll();
      });
    });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || (modalClose && e.target === modalClose)) {
        modal.classList.add('hidden');
        if (notification) notification.classList.remove('hidden');
        if (imageClickedWhenCreatorOpen) {
          Object.values(creatorModals).forEach(m => m.classList.remove('hidden'));
          imageClickedWhenCreatorOpen = false;
        }
        updateBodyScroll();
      }
    });
  }

  // Creator name click handling
  creatorNames.forEach(name => {
    name.addEventListener('click', (e) => {
      e.preventDefault();
      const classList = Array.from(name.classList);
      const creatorKey = classList.find(cls => creatorModals[cls]);

      // Hide all modals first
      Object.values(creatorModals).forEach(modal => modal.classList.add('hidden'));

      if (creatorKey && creatorModals[creatorKey]) {
        creatorModals[creatorKey].classList.remove('hidden');
        if (notification) notification.classList.add('hidden');
        imageClickedWhenCreatorOpen = true;
        updateBodyScroll();
      }
    });
  });

  // Close creator modals on outside click or close button
  Object.values(creatorModals).forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('creator-modal-close')) {
        modal.classList.add('hidden');
        if (notification) notification.classList.remove('hidden');
        imageClickedWhenCreatorOpen = false;
        updateBodyScroll();
      }
    });
  });
});
