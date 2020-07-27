
const slowScroll = () => {

  const menu = document.querySelector('nav.top-menu>.wrapper'),
        menuItems = menu.querySelectorAll('ul>li'),
        serviceBlockBtn = document.getElementById('totop');
  let requestInterval,
      y,
      count = 0,
      countCheck = 0;

  const scrollToId = () => {
    // console.log(y - count);
    count = document.documentElement.scrollTop;
    requestInterval = requestAnimationFrame(scrollToId);
    if(y > count + 2){
      count += (y - (count - 50)) / 15;
      document.documentElement.scrollTop = count;
    } else if(count > y){
      count -= ((count) - y) / 15;
      document.documentElement.scrollTop = count;
    } else {
      cancelAnimationFrame(requestInterval);
    }
    if(count === countCheck){
      cancelAnimationFrame(requestInterval);
    }
    countCheck = count;
  };

  menuItems.forEach((elem) => elem.addEventListener('click', function(){

    event.preventDefault();

    const idToScroll = document.getElementById(`${((elem.childNodes[0].href).split('#')[1])}`);
    y = Math.ceil(idToScroll.getBoundingClientRect().top) + document.documentElement.scrollTop + 50;

    requestAnimationFrame(scrollToId);
  }));

  serviceBlockBtn.addEventListener('click', function(event){

    event.preventDefault();

    y = Math.ceil(document.querySelector('.head').getBoundingClientRect().top);
    y += document.documentElement.scrollTop;

    requestAnimationFrame(scrollToId);
  });
};

export default slowScroll;