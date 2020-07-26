
const calculator = () => {

  const cardWrap = document.querySelector('.calculated-card');

  if (!cardWrap){
    return;
  }
  const cardType = cardWrap.querySelectorAll('.time>input'),
        promo = cardWrap.querySelector('[placeholder="Промокод"]'),
        priceTotal = cardWrap.querySelector('#price-total'),
        cardLetoMozaika = cardWrap.querySelector('#card_leto_mozaika'),
        cardLetoSchelkovo = cardWrap.querySelector('#card_leto_schelkovo'),
        period = {
          month1: [1999, 2999],
          month6: [9900, 14990],
          month9: [13900, 21990],
          month12: [19900, 24990]
        };
        
  let discount = 1,
      summary = 1999,
      periodCard = 1,
      indexArr = 0;


  const printSummary = () => {
    let count = 0;
    let id = setInterval(() => {
        count += summary/149;
      
      if(count > summary){
        clearInterval(id);
        priceTotal.textContent = Math.floor(summary);
      }else{
        priceTotal.textContent = Math.floor(count);
      }
      
    }, 1);
  };

  const calcSum = (check, index) => {
    if (promo.value !== ''){
      if (promo.value.trim().toUpperCase() === 'ТЕЛО2019'){
        discount = 0.7;
      }
    }

    summary = period[`month${check.value}`][index] * discount;
    printSummary();
  };

  const calcDiscont = () => {
    discount = 1;
    if (promo.value.trim().toUpperCase() === 'ТЕЛО2019'){
      discount = 0.7;
    }
    summary = period[`month${periodCard}`][indexArr] * discount;
    printSummary();
  };

  const calcClub = (i) => {
    summary = period[`month${periodCard}`][i] * discount;
    printSummary();
  };

  cardWrap.addEventListener('change', (event) => {
    const target = event.target;

    if (cardLetoMozaika.checked){
      cardType.forEach(item => {
        if (item === target){
          indexArr = 0;
          periodCard = item.value;
          calcSum(target, indexArr);
        }
      });
    } else if (cardLetoSchelkovo.checked){
      cardType.forEach(item => {
        if (item === target){
          indexArr = 1;
          periodCard = item.value;
          calcSum(target, indexArr);
        }
      });
    }

    if (target.id === 'card_leto_mozaika'){
      indexArr = 0;
      calcClub(indexArr);
    } else if (target.id === 'card_leto_schelkovo'){
      indexArr = 1;
      calcClub(indexArr);
    }

    if (target === promo && target.value !== ''){
      calcDiscont(target.value);
    }
  });
};

export default calculator;