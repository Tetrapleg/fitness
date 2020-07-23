const mainSlider = () => {
    const slider = document.querySelector('.main-slider'),
          slide = slider.querySelectorAll('.slide');
        ;

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
    elem[index].style.display = 'flex';
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

  const startSlide = (time = 1500) => {
    interval = setInterval(autoPlaySlide, time);

  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (event) => {
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

  slider.addEventListener('mouseover', (event) => {
    if(event.target.matches('.dot, .dot button')){
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', (event) => {
    if(event.target.matches('.dot, .dot button')){
      startSlide();
    }
  });

  const addDots = () => {

    let ul = document.createElement('ul');
    ul.classList.add('slider-dots');
    slider.append(ul);
    const dots = document.querySelector('.slider-dots');

    for(let i = 0; i < slide.length; i++){
      let li = document.createElement('li'),
          button = document.createElement('button');

      li.classList.add('dot');
      li.append(button);
      dots.append(li);
    }

    dot = document.querySelectorAll('.dot');
    
    startSlide();

  };

  addDots();
};

export default mainSlider;