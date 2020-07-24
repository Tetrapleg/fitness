const carousel = () => {

  let slidesToShow = 5;
      

  const servises = document.getElementById('services'),
        main = servises.querySelector('.wrapper'),
        wrap = document.querySelector('.services-slider'),
        slides = wrap.querySelectorAll('.slide'),
        next = main.querySelector('.next'),
        prev = main.querySelector('.prev'),
        options = {
          position: 1,
          infinity: true,
          widthSlides: Math.floor(100 / slidesToShow),
          maxPosition: slides.length - slidesToShow
        },
        responsive = [{
          breakpoint: 1170,
          slideToShow: 4
        },
        {
          breakpoint: 970,
          slideToShow: 3
        },
        {
          breakpoint: 768,
          slideToShow: 2
        },
        {
          breakpoint: 576,
          slideToShow: 1
        },
      ];

  const prevSlider = () => {
    if (options.infinity || options.position > 0){
      --options.position;
      if (options.position < 0){
        options.position = options.maxPosition;
      }
      wrap.style.transform = `translateX(-${options.position * options.widthSlides}%)`;
    }
  };

  const nextSlider = () => {
    if (options.infinity || options.position < options.maxPosition){
      ++options.position;
      if (options.position > options.maxPosition){
        options.position = 0;
      }
      wrap.style.transform = `translateX(-${options.position * options.widthSlides}%)`;
    }

  };

  const controlSlider = () => {
    prev.addEventListener('click', prevSlider);
    next.addEventListener('click', nextSlider);
  };

  const addStyle = () => {
    let style = document.getElementById('sliderCarousel-style');
    if (!style){
      style = document.createElement('style');
      style.id = 'sliderCarousel-style';
    }

    style.textContent = `
      .glo-slider{
        overflow: hidden !important;
        position: relative !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .glo-slider__wrap{
        display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .glo-slider__item{
        flex: 0 0 ${options.widthSlides}% !important;
        margin: 0 !important;
      }
    `;
    document.head.append(style);
  };
  const responseInit = () => {
    const slidesToShowDefault = slidesToShow,
          allResponse = responsive.map(item => item.breakpoint),
          maxResponse = Math.max(...allResponse);
    const checkResponse = () => {
      const widthWindow = document.documentElement.clientWidth;
      if (widthWindow < maxResponse){
        for (let i = 0; i < allResponse.length; i++){
          if (widthWindow < allResponse[i]){
            slidesToShow = responsive[i].slideToShow;
            options.widthSlides = Math.floor(100 / slidesToShow);
            addStyle();
          }
        }
      } else {
        slidesToShow = slidesToShowDefault;
        options.widthSlides = Math.floor(100 / slidesToShow);
        addStyle();
      }
    };

    checkResponse();

    window.addEventListener('resize', checkResponse);
  };

  const addGloClass = () => {
    main.classList.add('glo-slider');
    wrap.classList.add('glo-slider__wrap');
    for ( const item of slides){
      item.classList.add('glo-slider__item');
    }
  };

  const init = () => {
    addGloClass();
    addStyle();
    controlSlider();
    responseInit();
  };

  init();
};

export default carousel;