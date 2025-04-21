document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const h1 = document.querySelector('.carousel-heading');
    
    function showSlide(n) {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === n);
            console.log(`Slide ${index} is ${index === n ? 'active' : 'inactive'}`);
        });
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === n);  
        });
    
        const indicatorsContainer = document.querySelector('.indicators');
        if(n === 3){
            indicatorsContainer.classList.add('hidden');
            h1.classList.add('hidden');
        } else {
            indicatorsContainer.classList.remove('hidden');
            h1.classList.remove('hidden');
        }
    }
    
    document.querySelector('.next').addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    });
    
    document.querySelector('.prev').addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            slideIndex = index;
            showSlide(slideIndex);
        });
    });
    
    // Modal functionality for image expansion:
    const modal = document.querySelector('.modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    
    document.querySelectorAll('.main-image, .main-image-wider, .main-image-shorter')
      .forEach(image => {
        image.addEventListener('click', () => {
          modalContent.src = image.src;
          modal.classList.remove('hidden');
        });
      });
    
    // Close modal when clicking outside the modal content or on the close button
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target === modalClose) {
        modal.classList.add('hidden');
      }
    });
});