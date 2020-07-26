const sendForm = () => {
  const thanks = document.getElementById('thanks'),
        thanksContent = thanks.querySelector('.form-wrapper'),
        formContent = thanksContent.querySelector('.form-content');

  let form,
      promoCode = false,
      requesInterval,
      count = 0;
  
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: #ffd11a';
  
  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
  };

  const closeTanksAnimate = () => {

    count += 10;
    if(count <= 280){
      requesInterval = requestAnimationFrame(closeTanksAnimate);
      thanksContent.style.transform = `translateX(-${count}%)`;
    }else{
      cancelAnimationFrame(requesInterval);
      thanks.style.display = 'none';
    }
  };

  const closePopup = () => {
    thanksContent.style.transform = `translateX(0%)`;
    thanks.style.display = 'block';
    form.closest('.popup').style.display = 'none';
    form.closest('.form-wrapper').style.transform = `translateX(-280%)`;
  };

  const openThanks = () => {
    count = 0;
    thanksContent.style.transform = `translateX(-280%)`;
        
    const popupOnAnimate = () => {
  
    count += 10;
    if(count <= 280 ){
        requesInterval = requestAnimationFrame(popupOnAnimate);
        thanksContent.style.transform = `translateX(-${280 - count}%)`;
      }else{
        cancelAnimationFrame(requesInterval);
      }
    };

    if(document.documentElement.scrollWidth > 768){
      thanks.style.display = 'block';
      requestAnimationFrame(popupOnAnimate);
    }else{
      thanksContent.style.transform = `translateX(0)`;
      thanks.style.display = 'block';
    }
  };

  const postDataMessage = (message) => {
    formContent.innerHTML = `
      <h4>Спасибо!</h4>
      <p>Ваша заявка отправлена. <br> Мы свяжемся с вами в ближайшее время.</p>
      <button class="btn close-btn">OK</button>
    `;
    if (message){
      formContent.innerHTML = `
        <h4 style="color: red">Ошибка!</h4>
        <p style="color: red">Неудачная передача данных. <br> Пожалуйста, проверьте интернет-соединение.</p>
        <button class="btn close-btn">OK</button>
    `;
    }
    form.id === 'form1' || form.id === 'form2' ? closePopup() : openThanks();
  };

  const sendFormData = (elementsForm) => {

    form.appendChild(statusMessage);
    statusMessage.innerHTML = `
    <div id="preloader">
      <div class='sk-circle-bounce'>
        <div class='sk-child sk-circle-1'></div>
        <div class='sk-child sk-circle-2'></div>
        <div class='sk-child sk-circle-3'></div>
        <div class='sk-child sk-circle-4'></div>
        <div class='sk-child sk-circle-5'></div>
        <div class='sk-child sk-circle-6'></div>
        <div class='sk-child sk-circle-7'></div>
        <div class='sk-child sk-circle-8'></div>
        <div class='sk-child sk-circle-9'></div>
        <div class='sk-child sk-circle-10'></div>
        <div class='sk-child sk-circle-11'></div>
        <div class='sk-child sk-circle-12'></div>
      </div>
    </div>
    `;
    const formData = new FormData(form);
    let body = {};

    formData.forEach((val, key) => {
      body[key] = val;
    });
    form.reset();
    elementsForm.forEach( elem => {
      elem.style.border = '';
      elem.style.boxShadow = '';
      if (elem.name === 'phone'){
        elem.placeholder = 'Ваш номер телефона...';
      }
    });

    postData(body)
        .then((response) => {
          if(response.status !== 200){
            throw new Error('status network not 200');
          }
          statusMessage.innerHTML = '';
          postDataMessage();
        })
        .catch((error) => {
          statusMessage.innerHTML = '';
          postDataMessage(error);
          console.warn(error);
        });

  };

  const valid = () => {
    const elementsForm = [],
          elementsFormCard = [],
          elementsFormClub = [],
          elemFormToSend = [],
          patternPhone =  /^[+]{1}[7]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/,
          patternPromo = 'ТЕЛО2019';
          
    let count = 0,
        checkBox = true,
        choiceClub = false;

    for(const elem of form.elements){
      if(elem.tagName.toLowerCase() !== 'button' &&
      elem.type !== 'button'){
        if (elem.name === 'name' || elem.name === 'phone'){
          elementsForm.push(elem);
        } else if (elem.name === 'promo' && elem.value !== ''){
          elem.value.trim().toUpperCase() === patternPromo ? promoCode = true : promoCode = false;
        } else if (elem.type === 'radio'){
          if (elem.name === 'card-type' && elem.checked){
            elementsFormCard.push(elem);
          } else if (elem.name === 'club-name'){
            if (elem.checked){
              elementsFormClub.push(elem);
              choiceClub = true;
            } else {
              choiceClub = true;
            }
          }
        } else if (elem.type === 'checkbox'){
          elem.checked === true ? checkBox = true : checkBox = false;
        }
      }
    }
    
    elementsForm.forEach(elem => {
      if(!elem.value){
        elem.style.boxShadow = '0px 0px 5px 2px rgba(219,36,36,0.68)';
        elem.style.border = '1px solid red';
      } else {
        elem.style.boxShadow = '0px 0px 5px 2px rgba(57,143,56,0.68)';
        elem.style.border = '1px solid green';
      }
      if(elem.name === 'phone' && !patternPhone.test(elem.value)){
        elem.style.boxShadow = '0px 0px 5px 2px rgba(219,36,36,0.68)';
        elem.style.border = '1px solid red';
      }
      if(elem.style.border === '1px solid green'){
        count++;
      }
    });

    if(count === elementsForm.length){
      if (!elementsFormClub.length && choiceClub){
        alert('Выберите клуб');
        return;
      } else {
        if (!checkBox){
          alert('Нужно разрешить обработку данных');
          return;
        } else {
          elemFormToSend.push([...elementsForm, ...elementsFormCard, ...elementsFormClub, `promoCode: ${promoCode}`]);
          return sendFormData(elementsForm);
        }
      }
    }
  };

  thanks.addEventListener('click', (event) =>{
    cancelAnimationFrame(requesInterval);
    count = 0;
    let target = event.target;

    if(target.classList.contains('close_icon') || target.classList.contains('close-btn')){
      if(document.documentElement.scrollWidth > 768){
        requestAnimationFrame(closeTanksAnimate);
      }else{
        thanks.style.display = 'none';
      }
    } else {
        target = target.closest('.form-content');
        if(!target){
          if(document.documentElement.scrollWidth > 768){
            requestAnimationFrame(closeTanksAnimate);
          }else{
            thanks.style.display = 'none';
          }
        }
    }
  });

  document.body.addEventListener('click', event => {

    const target = event.target;
    if (target.type && target.type.toLowerCase() === 'submit' && target.closest('form')){
      form = target.closest('form');
      event.preventDefault();
      valid();
    }
  });
};

export default sendForm;