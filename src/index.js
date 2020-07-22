'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';

import burger from './modules/burger';
import dropdownMenu from './modules/dropdownMenu';
import callBackPopup from './modules/callBackPopup';
import present from './modules/present';
import arrowUp from './modules/arrowUp';
import modalOne from './modules/modalOne';
import sendForm from './modules/sendForm';

burger();
dropdownMenu();
callBackPopup();
present();
arrowUp();
modalOne();
sendForm();
