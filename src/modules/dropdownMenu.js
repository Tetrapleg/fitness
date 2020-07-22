const dropdownMenu = () => {
  const clubsList = document.querySelector('.clubs-list');
  
  clubsList.addEventListener('click', () => {
    const dropdownList = clubsList.childNodes[3];

    if (dropdownList.style.display === 'none' || dropdownList.style.display === ''){
      dropdownList.style.display = 'block';
    } else {
      dropdownList.style.display = 'none';
    }
  });
};

export default dropdownMenu;