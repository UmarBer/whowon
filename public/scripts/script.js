//const highScore = require('../routes/scoreboard');

const facebook = document.querySelector('.facebook');
const whatsapp = document.querySelector('.whatsapp');
const twitter = document.querySelector('.twitter');
const telegram = document.querySelector('.telegram');

const pageUrl = location.href;
const message = 'this is a test';

const facebookApi = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fguesswhowon.herokuapp.com%2F&amp;src=sdkpreparse`;
const whatsappApi = `https://wa.me/?text=${pageUrl}. ${message}`;
const twitterApi = `https://twitter.com/intent/tweet?text=${pageUrl}. ${message}`;
const telegramApi = `https://t.me/share/url?url=${pageUrl}&text=${message}`;

window.addEventListener(
  'load',
  () => {
    console.log('Ironmaker app started successfully!');
  },
  false
);

facebook.addEventListener('click', () => {
  window.open((url = facebookApi), (target = 'blank'));
});

whatsapp.addEventListener('click', () => {
  window.open((url = whatsappApi), (target = 'blank'));
});
twitter.addEventListener('click', () => {
  window.open((url = twitterApi), (target = 'blank'));
});
telegram.addEventListener('click', () => {
  window.open((url = telegramApi), (target = 'blank'));
});
