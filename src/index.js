'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'es6-promise';
import 'fetch-polyfill';
import 'mdn-polyfills/Node.prototype.append';
import 'mdn-polyfills/Node.prototype.remove';

import burger from './modules/burger';
import dropdownMenu from './modules/dropdownMenu';
import callBackPopup from './modules/callBackPopup';
import present from './modules/present';
import arrowUp from './modules/arrowUp';
import modalOne from './modules/modalOne';
import mainSlider from './modules/mainSlider';
import photoGallery from './modules/photoGallery';
import carousel from './modules/carousel';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';
import mascPhoneName from './modules/mascPhoneName';

burger();
dropdownMenu();
callBackPopup();
present();
arrowUp();
modalOne();
mainSlider();
photoGallery();
carousel();
calculator();
sendForm();
mascPhoneName();
