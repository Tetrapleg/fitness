const photoGallery = () => {
  const galleryWrapper = document.querySelector('.gallery-bg .wrapper'),
        gallerySlider = document.querySelector('.gallery-slider'),
        slide =  gallerySlider.querySelectorAll('.slide'),
        arrowPrev = gallerySlider.querySelector('.prev'),
        arrowNext = gallerySlider.querySelector('.next');

  gallerySlider.style.position = 'relative';
  let currentSlide = 0,
      dot,
      interval;

  const prevSlide = (elem, index) => {
    elem[index].style.display = 'none';
  };

  const prevDots = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index) => {
    elem[index].style.display = 'block';
  };

  const nextDots = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {

    prevSlide(slide, currentSlide);
    prevDots(dot, currentSlide, 'slick-active');
    currentSlide++;
    if(currentSlide >= slide.length){
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide);
    nextDots(dot, currentSlide, 'slick-active');
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);

  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  galleryWrapper.addEventListener('click', (event) => {
    event.preventDefault();

    let target = event.target;

    if(!target.matches('.dot, .dot button')){
      return;
    }

    prevSlide(slide, currentSlide);
    prevDots(dot, currentSlide, 'slick-active');

    if(target.matches('.dot, .dot button')){
      dot.forEach((elem, index) => {
        if(elem === target.closest('.dot')){
          currentSlide = index;
        }
      });
    }

    if(currentSlide >= slide.length){
      currentSlide = 0;
    }

    if(currentSlide < 0){
      currentSlide = slide.length - 1;
    }

    nextSlide(slide, currentSlide);
    nextDots(dot, currentSlide, 'slick-active');

  });

  galleryWrapper.addEventListener('mouseover', (event) => {
    if(event.target.matches('.dot, .dot button') || event.target.closest('.slider-arrow')){
      stopSlide();
    }
  });

  galleryWrapper.addEventListener('mouseout', (event) => {
    if(event.target.matches('.dot, .dot button') || event.target.closest('.slider-arrow')){
      startSlide();
    }
  });

  arrowPrev.addEventListener('click', () => {
    prevSlide(slide, currentSlide);
    prevDots(dot, currentSlide, 'slick-active');

    currentSlide--;
    if(currentSlide < 0){
      currentSlide = slide.length - 1;
    }
    
    nextSlide(slide, currentSlide);
    nextDots(dot, currentSlide, 'slick-active');
  });
  arrowNext.addEventListener('click', () => {
    prevSlide(slide, currentSlide);
    prevDots(dot, currentSlide, 'slick-active');
    
    currentSlide++;
    if(currentSlide > slide.length - 1){
      currentSlide = 0;
    }
    
    nextSlide(slide, currentSlide);
    nextDots(dot, currentSlide, 'slick-active');
  });

  const addDotsArrows = () => {

    let ul = document.createElement('ul');
    ul.classList.add('slider-dots');
    gallerySlider.insertAdjacentElement('beforeend', ul);
    const galleryDots =  gallerySlider.querySelector('.slider-dots');

    for(let i = 0; i < slide.length; i++){
      let li = document.createElement('li'),
          button = document.createElement('button');

      li.classList.add('dot');
      li.append(button);
      galleryDots.append(li);
    }
    
    dot = gallerySlider.querySelectorAll('.dot');

    startSlide(5000);

  };

  addDotsArrows();
};

export default photoGallery;