'use strict';

var productContainer = document.getElementById('allProducts');
var leftImgTag = document.getElementById('left');
var middleImgTag = document.getElementById('center');
var rightImgTag = document.getElementById('right');
var stats = document.getElementById('stats');

var totalClicks = 0;
//holds all products instantiated
Product.allProducts = [];
//holds 6 values
Product.checkDupes = [];


// //store products already on the page
var leftProduct = null;
var middleProduct = null;
var rightProduct = null;

function Product (name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.timesShown = 0;
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
  return Math.floor(Math.random() * Product.allProducts.length);
}

function displayProducts () {
  //generate array of random # that correlates with each index
  while (Product.checkDupes.length < 6) {
    var number = randomNumber();
    //if the number is not in the array, then that image has not been shown,
    //so push the number into the array
    if (!Product.checkDupes.includes(number)) {
      Product.checkDupes.push(number);
    }
    //do this until the array is at 6 numbers again
    //all 6 numbers are unique
  }
  console.log(Product.checkDupes);
  leftImgTag.src = Product.allProducts[Product.checkDupes[0]].src;
  Product.allProducts[Product.checkDupes[0]].timesShown++;
  leftProduct = Product.allProducts[Product.checkDupes[0]];

  middleImgTag.src = Product.allProducts[Product.checkDupes[1]].src;
  Product.allProducts[Product.checkDupes[1]].timesShown++;
  middleProduct = Product.allProducts[Product.checkDupes[1]];

  rightImgTag.src = Product.allProducts[Product.checkDupes[2]].src;
  Product.allProducts[Product.checkDupes[2]].timesShown++;
  rightProduct = Product.allProducts[Product.checkDupes[2]];

  //only keep the last 3 numbers because the first 3 have been used
  //these 3 nums will now be at the beginning of checkDupes
  Product.checkDupes = Product.checkDupes.slice(3, 6);
  console.log(Product.checkDupes);
}

var handleClick = function (event) {
  if (event.target === productContainer) {
    return alert('click on an image, please');
  }
  totalClicks++;
  console.log('clicked ' + totalClicks);
  var clickedProduct = event.target;
  var id = clickedProduct.id;
  if (id === 'left' || id === 'center' || id === 'right') {
    if (id === 'left') {
      leftProduct.clicks++;
      console.log(leftProduct.name + ' was selected');
    }
    if (id === 'center') {
      middleProduct.clicks++;
      console.log( middleProduct.name + ' was selected');
    }
    if (id === 'right') {
      rightProduct.clicks++;
      console.log(rightProduct.name + ' was selected');
    }
  }

  if (totalClicks === 25) {
    productContainer.removeEventListener('click', handleClick);
    renderStats();
  }
  displayProducts();
};

function renderStats () {
  for (var i = 0; i < Product.allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[i].clicks + ' votes for ' + Product.allProducts[i].name;
    stats.appendChild(liEl);
  }
}

productContainer.addEventListener('click', handleClick);
