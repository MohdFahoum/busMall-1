'use strict';

var allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var allProductSrc = ['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg', './img/pet-sweep.jpg', './img/scissors.jpg', './img/shark.jpg', './img/sweep.png', './img/tauntaun.jpg', './img/unicorn.jpg', './img/usb.gif', './img/water-can.jpg', './img/wine-glass.jpg'];

var productContainer = document.getElementById('allProducts');
var buttonLinks = document.getElementById('buttonLinks');
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

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.timesShown = 0;
  Product.allProducts.push(this);
}

function instantiateProducts () {
  for(var i = 0; i < allProductNames.length; i++) {
    new Product(allProductNames[i], allProductSrc[i]);
  }
}

instantiateProducts();
displayProducts();

function randomNumber() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

function displayProducts() {
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

var handleClick = function(event) {
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

  if(totalClicks === 2) {
    productContainer.removeEventListener('click', handleClick);
    renderStats();
  }
  displayProducts();
};

function renderStats() {
  var h1El = document.createElement('h1');
  h1El.textContent = 'Stats';
  stats.appendChild(h1El);

  var buttonEl = document.createElement('a');
  buttonEl.textContent = 'Stats';
  buttonEl.setAttribute('class', 'btn');
  buttonEl.href = '#statsContainer';
  buttonLinks.appendChild(buttonEl);

  for (var i = 0; i < Product.allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[i].clicks + ' votes for ' + Product.allProducts[i].name;
    stats.appendChild(liEl);
  }
}

function renderChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

productContainer.addEventListener('click', handleClick);
