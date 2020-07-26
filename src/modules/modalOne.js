const modalOne = () => {
    const openPopup = document.querySelector('.open-popup'),
        popup = document.getElementById('free_visit_form'),
        popupContent = document.querySelector('.form__wrapper-free');

  let requesInterval,
  count = 0;

  popupContent.style.transform = `translateX(-280%)`;
      
  const popupOnAnimate = () => {

  count += 10;
  if(count <= 280 ){
      requesInterval = requestAnimationFrame(popupOnAnimate);
      popupContent.style.transform = `translateX(-${280 - count}%)`;
    }else{
      cancelAnimationFrame(requesInterval);
    }
  };

  const popupOffAnimate = () => {

    count += 10;
    if(count <= 280){
      requesInterval = requestAnimationFrame(popupOffAnimate);
      popupContent.style.transform = `translateX(-${count}%)`;
    }else{
      cancelAnimationFrame(requesInterval);
      popup.style.display = 'none';
    }
  };
  
  openPopup.addEventListener('click', () => {
    cancelAnimationFrame(requesInterval);
    count = 0;
    if(document.documentElement.scrollWidth > 768){
      popup.style.display = 'block';
      requestAnimationFrame(popupOnAnimate);
    }else{
      popupContent.style.transform = `translateX(0)`;
      popup.style.display = 'block';
    }
  });

  popup.addEventListener('click', (event) =>{
    cancelAnimationFrame(requesInterval);
    count = 0;
    let target = event.target;
    

    if(target.classList.contains('close_icon')){
      if(document.documentElement.scrollWidth > 768){
        requestAnimationFrame(popupOffAnimate);
      }else{
        popup.style.display = 'none';
      }
    } else {
        target = target.closest('.form-content');
        if(!target){
          if(document.documentElement.scrollWidth > 768){
            requestAnimationFrame(popupOffAnimate);
          }else{
            popup.style.display = 'none';
          }
        }
    }
  });
};

export default modalOne;