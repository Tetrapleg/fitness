const burger = () => {
  const hiddenSmall = document.querySelector('.hidden-small'),
        hiddenLarge = document.querySelector('.menu-button'),
        topMenu = document.querySelector('.top-menu'),
        popupMenu = document.querySelector('.popup-menu'),
        closeBtn = document.querySelector('.close-menu-btn>img'),
        menuItems = popupMenu.querySelectorAll('.scroll');

  const stickBurger = () => {
 
    document.addEventListener('scroll', () => {
      if (document.documentElement.scrollWidth < 768){
        const documentScroll = document.documentElement.scrollTop;

        if (documentScroll >= 186){
          topMenu.style.position = 'fixed';
        } else {
          topMenu.removeAttribute('style');
        }
      }

    });
  };

  stickBurger();

  window.addEventListener('resize', () => {
    if(document.documentElement.scrollWidth < 768){
      hiddenSmall.style.display = 'none';
      hiddenLarge.classList.remove('hidden-large');
    }else{
      hiddenSmall.style.display = 'flex';
      hiddenLarge.classList.add('hidden-large');
    }
  });

  const handlerMenu = () => {
    popupMenu.classList.toggle('hidden-large');
    popupMenu.style.display === 'none' || popupMenu.style.display === '' ? popupMenu.style.display = 'flex' : popupMenu.style.display = 'none'; 
  };

  document.addEventListener('click', (event) => {

    const target = event.target.closest('.popup-menu');

    if(popupMenu.classList.contains('hidden-large')){
      if(event.target.closest('.menu-button') === hiddenLarge){
        handlerMenu();
      }
    } else {
      if((popupMenu.className === 'hidden-large') === false){
        if(target){
          if(event.target === closeBtn){
            handlerMenu();
          }

          menuItems.forEach((item) => {
            if(item === event.target.closest('li')){
            handlerMenu();
            }
          });
        } else {
          handlerMenu();
        }
      }
    }
  });
};

export default burger;