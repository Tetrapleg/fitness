const present = () => {
  const fixedGift = document.querySelector('.fixed-gift'),
        popup = document.getElementById('gift'),
        popupContent = document.querySelector('.form__wrapper-gift');

  if (!fixedGift){
    return;
  }
  let requesInterval,
  count = 280;
      
  popupContent.style.transform = `translateX(-280%)`;

  const popupOnAnimate = () => {

  count -= 10;
  if(count >= 0 ){
      requesInterval = requestAnimationFrame(popupOnAnimate);
      popupContent.style.transform = `translateX(-${count}%)`;
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


  
  fixedGift.addEventListener('click', () => {
    if(document.documentElement.scrollWidth > 768){
      popup.style.display = 'block';
      requestAnimationFrame(popupOnAnimate);
    }else{
      popupContent.style.transform = `translateX(0)`;
      popup.style.display = 'block';
    }
    fixedGift.style.display = 'none';
  });

  popup.addEventListener('click', (event) =>{
    let target = event.target;

    if(target.classList.contains('close_icon') || target.classList.contains('close-btn')){
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

export default present;