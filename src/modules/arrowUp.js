const arrowUp = () => {
  const totop = document.getElementById('totop'),
        clubs = document.getElementById('clubs');

  totop.style.display = 'none';

  document.addEventListener('scroll', () => {
    console.log(clubs.getBoundingClientRect().top);
    if (clubs.getBoundingClientRect().top <= 0){
      totop.style.display = 'block';
    } else {
      totop.style.display = 'none';
    }
  });
};

export default arrowUp;