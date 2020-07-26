const mascPhoneName = () => {
  const inputPhone = document.querySelectorAll('input[type="tel"]');

  const maskPhone = (event) => {
    const keyCode = event.keyCode,
          masked = '+7 (___) ___-__-__',
          def = masked.replace(/\D/g, ""),
          element = event.target,
          val = element.value.replace(/\D/g, "");

    let i = 0,
      newValue = masked.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i != -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = masked.substr(0, element.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(element.value) || element.value.length < 5 || keyCode > 47 && keyCode < 58) {
      element.value = newValue;
    }
    if (event.type == "blur" && element.value.length < 5) {
      element.value = "";
      element.placeholder = 'Ваш номер телефона...';
    }
  };

  const maskName = (event) => {
    event.target.value = event.target.value.replace(/[^ А-Яа-яЁё]/, '');
  };

  document.addEventListener("input", (event) => {
    if (event.target.name === 'phone'){
      maskPhone(event);
    } else if (event.target.name === 'name'){
      maskName(event);
    }
  });

  inputPhone.forEach(item => {
    item.addEventListener("blur", (event) => {
        maskPhone(event);
    });
    item.addEventListener("focus", (event) => {
      event.target.placeholder = '+7 (___) ___-__-__';
    });
  });


 };

export default mascPhoneName;

