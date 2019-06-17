'use strict';

Product.allProducts = [];

var leftImgTag = document.getElementById('left');
var centerImgTag = document.getElementById('center');
var rightImgTag = document.getElementById('right');

function Product (name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

new Product('bag','./img/bag.jpg');
new Product('banana','./img/banana.jpg');
new Product('bathroom','./img/bathroom.jpg');
new Product('boots','./img/boots.jpg');
new Product('breakfast','./img/breakfast.jpg');
new Product('bubblegum','./img/bubblegum.jpg');
new Product('chair','./img/chair.jpg');
new Product('cthulhu','./img/cthulhu.jpg');
new Product('dog-duck','./img/dog-duck.jpg');
new Product('dragon','./img/dragon.jpg');
new Product('pen','./img/pen.jpg');
new Product('pet-sweep','./img/pet-sweep.jpg');
new Product('scissors','./img/scissors.jpg');
new Product('shark','./img/shark.jpg');
new Product('sweep','./img/sweep.png');
new Product('tauntaun','./img/tauntaun.jpg');
new Product('unicorn','./img/unicorn.jpg');
new Product('usb','./img/usb.gif');
new Product('water-can','./img/water-can.jpg');
new Product('wine-glass','./img/wine-glass.jpg');

displayProducts();

function randomNumber () {
  return Math.round(Math.random() * Product.allProducts.length);
}

function displayProducts () {
  //generate an array of random # that correlates with each ind
  leftImgTag.src = Product.allProducts[0].src;
  centerImgTag.src = Product.allProducts[1].src;
  rightImgTag.src = Product.allProducts[2].src;
}
