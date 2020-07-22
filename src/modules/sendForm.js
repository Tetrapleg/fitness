const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

  let form;
  
  const statusMessage = document.createElement('div');
  statusMessage.textContent = 'Тут будет сообщение!';
  statusMessage.style.cssText = 'font-size: 2rem;';
  
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
    });

    postData(body)
        .then((response) => {
          if(response.status !== 200){
            throw new Error('status network not 200');
          }
          if (form.id === 'form3'){
            statusMessage.style.cssText = 'font-size: 2rem; color: #fff';
          }
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          if (form.id === 'form3'){
            statusMessage.style.cssText = 'font-size: 2rem; color: #fff';
          }
          statusMessage.textContent = errorMessage;
          console.error(error);
        });

  };

  const valid = () => {

    const elementsForm = [],
          strForm = form.id;
     
    for(const elem of form.elements){
      if(elem.tagName.toLowerCase() !== 'button' &&
      elem.type !== 'button'){
        elementsForm.push(elem);
      }
    }

    let count = 0;
    const patternPhone = /^\+\d{5,15}$/;
    elementsForm.forEach(elem => {
      if(!elem.value){
        elem.style.border = '2px solid red';
      } else {
        elem.style.border = '2px solid green';
      }

      if(elem.id === `${strForm}-phone` && !patternPhone.test(elem.value)){
        elem.style.border = '2px solid red';
      }
      if(elem.style.border === '2px solid green'){
        count++;
      }
    });

    if(count === elementsForm.length){
      return sendFormData(elementsForm, strForm);
    }
      
  };

  document.body.addEventListener('submit', event => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'form'){
      event.preventDefault();
      form = target;
      valid();
    }
  });

};

export default sendForm;