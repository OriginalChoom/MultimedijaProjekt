document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const h1 = document.querySelector('.carousel-heading');
  const creatorName = document.querySelector('.creator-name');
  const creatorModal = document.querySelector('.creator-modal');
  const modal = document.querySelector('.modal');
  const modalContent = modal ? modal.querySelector('.modal-content') : null;
  const modalClose = modal ? modal.querySelector('.modal-close') : null;
  const notification = document.querySelector('.notification');

  // Check for creatorModal close button only if creatorModal exists.
  const creatorModalClose = creatorModal ? creatorModal.querySelector('.creator-modal-close') : null;

  let imageClickedWhenCreatorOpen = false; // Varijabla za praćenje stanja

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
          if(n === 3){
              indicatorsContainer.classList.add('hidden');
              h1.classList.add('hidden');
          } else {
              indicatorsContainer.classList.remove('hidden');
              h1.classList.remove('hidden');
          }
      }
  }

  function updateBodyScroll() {
    if (modal && creatorModal) {
      if (modal.classList.contains('hidden') && creatorModal.classList.contains('hidden')) {
          document.body.classList.remove('no-scroll');
      } else {
          document.body.classList.add('no-scroll');
      }
    }
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
  
  // Open modal when clicking on images
  document.querySelectorAll('.main-image, .main-image-wider, .main-image-shorter')
    .forEach(image => {
      image.addEventListener('click', () => {
        if(modalContent && modal) {
          modalContent.src = image.src;
          modal.classList.remove('hidden');
        }
        if(creatorModal) {
          creatorModal.classList.add('hidden');
        }
        if(notification) {
          notification.classList.add('hidden');
        }
        imageClickedWhenCreatorOpen = true;
        updateBodyScroll(); // Update scroll state when modal is opened
      });
    });
  
  // Close modal on background or close button click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || (modalClose && e.target === modalClose)) {
        modal.classList.add('hidden');
        if(notification) {
          notification.classList.remove('hidden');
        }
        updateBodyScroll(); // Update scroll state when modal is closed
      }
      if(imageClickedWhenCreatorOpen && creatorModal) {
        creatorModal.classList.remove('hidden'); 
        imageClickedWhenCreatorOpen = false; 
        updateBodyScroll(); // Update scroll state when modal is closed
      }
    });
  }

  // Open creator modal when creator name is clicked
  if (creatorName && creatorModal) {
    creatorName.addEventListener('click', (e) => {
      console.log('Creator name clicked!');
      e.preventDefault();
      creatorModal.classList.remove('hidden');
      if(notification) {
        notification.classList.add('hidden');
      }
      updateBodyScroll(); // Update scroll state when modal is opened
    });
  }

  // Close creator modal when clicking outside the content box
  if (creatorModal) {
    creatorModal.addEventListener('click', (e) => {
      if (e.target === creatorModal) {
          creatorModal.classList.add('hidden');
          if(notification) {
            notification.classList.remove('hidden');
          }
          updateBodyScroll(); // Update scroll state when modal is closed
      }
    });
  }

  // Dedicated listener for creator modal close button
  if (creatorModalClose && creatorModal) {
    creatorModalClose.addEventListener('click', () => {
      console.log('Creator modal close button clicked!');
      creatorModal.classList.add('hidden');
      if(notification) {
        notification.classList.remove('hidden');
      }
      updateBodyScroll(); // Update scroll state when modal is closed
    });
  }
});