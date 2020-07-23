const arrowUp = () => {
  const totop = document.getElementById('totop'),
        headSlider = document.querySelector('.head-slider');

  totop.style.display = 'none';

  document.addEventListener('scroll', () => {

    if (headSlider.getBoundingClientRect().bottom <= 0){
      totop.style.display = 'block';
    } else {
      totop.style.display = 'none';
    }
  });
};

export default arrowUp;