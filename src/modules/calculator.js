
const calculator = () => {

  const cardType = document.querySelectorAll('.time>input'),
        cardWrap = document.getElementById('card_order'),
        promo = document.querySelector('[placeholder="Промокод"]'),
        priceTotal = document.getElementById('price-total');

  let discount = 1,
      summary = 1999;

  const printSummary = (sum) => {
    let count = 0;
    let id = setInterval(() => {
        count += sum/149;
      
      if(count > sum){
        clearInterval(id);
        priceTotal.textContent = Math.floor(sum);
      }else{
        priceTotal.textContent = Math.floor(count);
      }
      
    }, 1);
  };

  const calcSum = (check) => {
    if (promo.value !== ''){
      if (promo.value.trim().toUpperCase() === 'ТЕЛО2019'){
        discount = 0.7;
      }
    }
    if (check === 'm2'){
      summary = 9900 * discount;
      printSummary(summary);
    } else if (check === 'm3'){
      summary = 13900 * discount;
      printSummary(summary);
    } else if (check === 'm4'){
      summary = 19900 * discount;
      printSummary(summary);
    } else if (check === 'm1'){
      summary = 1999 * discount;
      printSummary(summary);
    }
  };

  const calcDiscont = (value) => {
    if (promo.value.trim().toUpperCase() === 'ТЕЛО2019'){
      discount = 0.7;
    }
    summary = priceTotal.textContent * discount;
    printSummary(summary);
  };

  cardWrap.addEventListener('change', (event) => {
    const target = event.target;

    cardType.forEach(item => {
      if (item === target){
        calcSum(target.id);
      }
    });

    if (target === promo && target.value !== ''){
      calcDiscont(target.value);
    }
  });
};

export default calculator;