let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.btn-close');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  {
    id: 1,
    name: 'Chicken',
    description: 'Classic Mexican fajitas, healthy and flavorful weeknight meal.',
    image: '1.PNG',
    price: 120,
  },
  {
    id: 2,
    name: 'Fajitas',
    description: 'Classic Mexican fajitas, easy and quick.',
    image: '2.PNG',
    price: 50,
  },
  {
    id: 3,
    name: 'Chicken Masala',
    description: 'Rich, spicy, and full of flavor.',
    image: '3.PNG',
    price: 220,
  },
];
let listCards = [];

function initApp() {
  products.forEach((product, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
      <img src="image/${product.image}">
      <div class="title">${product.name}</div>
      <div class="description">${product.description}</div>
      <div class="price">${product.price.toLocaleString()}$/each</div>
      <button onclick="addToCart(${key})">Add To Cart</button>`;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  body.classList.add('active');
  reloadCart();
}

function reloadCart() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((item, key) => {
    if (item) {
      totalPrice += item.price;
      count += item.quantity;
      let newDiv = document.createElement('li');
      newDiv.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      newDiv.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="image/${item.image}" class="me-3" style="width: 50px; height: 50px;">
          <span>${item.name}</span>
        </div>
        <div>${item.price.toLocaleString()}$</div>
        <div class="d-flex align-items-center">
          <button onclick="changeQuantity(${key}, ${item.quantity - 1})" class="btn btn-sm btn-outline-secondary">-</button>
          <span class="count mx-2">${item.quantity}</span>
          <button onclick="changeQuantity(${key}, ${item.quantity + 1})" class="btn btn-sm btn-outline-secondary">+</button>
          <button onclick="removeFromCart(${key})" class="btn btn-sm btn-danger ms-2">Delete</button>
        </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString() + '$';
  quantity.innerText = count;
}

function changeQuantity(key, newQuantity) {
  if (newQuantity == 0) {
    removeFromCart(key);
  } else {
    listCards[key].quantity = newQuantity;
    listCards[key].price = newQuantity * products[key].price;
    reloadCart();
  }
}

function removeFromCart(key) {
  delete listCards[key];
  reloadCart();
}
