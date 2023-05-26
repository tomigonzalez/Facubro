document.querySelector(".menu").addEventListener("click", animateBars);

let linea1 = document.querySelector(".linea1");
let linea2 = document.querySelector(".linea2");
let linea3 = document.querySelector(".linea3");

function animateBars() {
  linea1.classList.toggle("activa-linea1");
  linea2.classList.toggle("activa-linea2");
  linea3.classList.toggle("activa-linea3");
}

const iconoMenu = document.querySelector("#iconoMenu"),
  menu = document.querySelector("#menuActive");

iconoMenu.addEventListener("click", (e) => {
  menu.classList.toggle("active-menu");
});

const shopContent = document.querySelector(".productos");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const renderProduct = (product) => {
  const { img, nombre, cantidad, precio, id } = product;

  return `
    <div class="card">
      <img src="${img}" class="img">
      <h2 class="texto-descript">${nombre}</h2>
      <p>Cantidad: ${cantidad}</p>
      <p>Precio: $${precio}</p>
      <button class="comprar btn-add"data-id='${id}' data-name='${nombre}' data-price='${precio}' data-img='${img}' >Agregar al carrito</button>
    </div>
  `;
};

const renderProducts = (category = undefined) => {
  if (!category) {
    renderPopularProducts();
    return;
  }
  renderFilteredProducts(category);
};

const renderPopularProducts = () => {
  shopContent.innerHTML += mostPopularProducts().map(renderProduct).join("");
};

//renderizar productos filtrados
const renderFilteredProducts = (category) => {
  const productsList = products.filter(
    (product) => product.category === category
  );
  shopContent.innerHTML = productsList.map(renderProduct).join("");
};

//Filtros
const categoriesList = document.querySelectorAll(".marcas");

let selectedCategory = null;
const changeFilterState = (e) => {
  const category = e.target.dataset.category;

  if (selectedCategory === category) {
    window.location.reload();
    selectedCategory = null; // Si la categoría seleccionada es la misma, la desactivamos
  } else {
    selectedCategory = category; // Establecemos la nueva categoría seleccionada
  }

  changeBtnActiveState(selectedCategory);
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];

  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("activados");
      return;
    }
    categoryBtn.classList.add("activados");
  });
};

const applyFilter = (e) => {
  console.log(e.target.dataset);
  if (!e.target.matches(".marcas, .card__name")) return;
  changeFilterState(e);

  if (!e.target.dataset.category) {
    shopContent.innerHTML = "";
    console.log(e.target.dataset);
    renderProducts();
  } else {
    renderProducts(e.target.dataset.category);
    console.log(e.target.dataset);
  }
  if (shopContent.innerHTML == "") {
    shopContent.innerHTML = "<p class='out-stock'>Sin Stock</p>";
    console.log(e.target.dataset);
  }
};

////////cart///////////
const btnBuy = document.querySelector(".btn-buy");
const btnDelete = document.querySelector(".btn-delete");

const saveLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//Span que muestra el numero de pedidos en el carrito
const cartCount = document.getElementById("icon-span");
const productsCartStorage = document.querySelector(".cart__main");

const renderCartProduct = (cartProduct) => {
  const { id, nombre, precio, img, quantity } = cartProduct;
  return ` 
  
        <div class="card1 card--cart box-shadow">
          <div class="contenedordeimagen">
          <img class="card__img" src="${img}" alt="${nombre}" />
          </div>

          <div class="card__info">
            <p class="card__name">${nombre}</p>
            <p class="card__price gradient-text">$ ${precio}</p>
          </div>

          <div class="card__buttons">
                  <button class="btn btn--cart down" data-id="${id}">-</button>
                  <span class="card__quantity">${quantity}</span>
                  <button class="btn btn--cart up" data-id="${id}">+</button>
              </div>
        </div>
      
    `;
};
const renderCart = () => {
  // si el carrito esta vacio muestra un msg
  if (!cart.length) {
    productsCartStorage.innerHTML = `<p class="empty-msg"> No hay productos en el carrito. </p>`;
    return;
  }
  // renderiza los productos que hay

  productsCartStorage.innerHTML = cart.map(renderCartProduct).join("");
};

//Funcion para para conseguir el total entre todos los productos del carrito

const getCartTotal = () => {
  return cart.reduce((acc, cur) => {
    if (cur.precio === "Gratis") {
      //Si el precio el 'gratis' suma 0 al total
      return acc + 0;
    } else {
      return acc + Number(cur.precio) * Number(cur.quantity);
    }
  }, 0);
};

const getTotalProductsInCart = () => {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    const element = cart[i].quantity;
    count += element;
  }
  return count;
};
const showTotalProductsInCart = () => {
  const count = getTotalProductsInCart();
  if (count < 1) {
    cartCount.style.display = "none";
    return;
  }
  cartCount.style.display = "flex";
  cartCount.innerHTML = count;
};
//El total en precio del carrito
const total = document.querySelector(".total");
//Renderizar el total de los productos
const showTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(1)} $`;
};

//Funcion para deshabilitar los botones si no hay nada en el carrito
const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.remove("btn");
    btn.classList.add("disabled");
    return;
  }
  btn.classList.add("btn");
  btn.classList.remove("disabled");
};

//Funcion que se encarga de agregar un producto al carrito
const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const { id, price, img, name } = e.target.dataset;
  const product = createProductObj(id, price, img, name);

  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
  } else {
    createCartProduct(product);
  }
  checkCartState();
};

//Crea un objeto con la data del producto
const createProductObj = (id, precio, img, nombre, desc, quantity) => {
  return { id, precio, img, nombre, desc, quantity };
};

//Agrega el objeto del producto al carrito
const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};
console.log(cart);
//Comprueba si el producto existe el carrito
const isExistingCartProduct = (product) => {
  return cart.find((itemCart) => itemCart.id === product.id);
};
//Funcion que reutiliza otras funciones necesarias en cada cambio del carrito
const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart();
  showTotal();
  showTotalProductsInCart();
  disableBtn(btnBuy);
  disableBtn(btnDelete);
};

//Remover producto del carrito
const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  checkCartState();
};

//Aumenta la cantidad del producto en 1
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

//Disminuir la unidad del producto
const substractProductUnit = (existingProduct) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === existingProduct.id
      ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
      : cartProduct;
  });
};

//Si aumentamos la unidad del producto
const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

//Si disminuimos la unidad del producto
const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    if (window.confirm("Desea eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  substractProductUnit(existingCartProduct);
};

//Comprueba si estamos disminuyendo o sumando la unidad
const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  checkCartState();
};

const resetCartItems = () => {
  cart = [];
  checkCartState();
};

//Funcionalidad de los botones del carrito
const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

//Completar compra
const completeBuy = () => {
  completeCartAction(
    "¿Desea completar su compra?",
    "La compra se ha realizado correctamente"
  );
};

//Vaciar carrito
const deleteCart = () => {
  completeCartAction(
    "¿Está seguro de que desea vaciar el carrito?",
    "Tu carrito está vacio"
  );
};

///////filtrado//////////

const btnOpenCart = document.getElementById("verCarrito");

document.addEventListener("DOMContentLoaded", () => {
  btnOpenCart.addEventListener("click", () => {
    modalContainer.classList.toggle("is-active");
  });
});
const categories = document.querySelector(".filtrado");

const init = () => {
  renderProducts();
  categories.addEventListener("click", applyFilter);
  renderProducts();
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("click", addProduct);
  modalContainer.addEventListener("DOMContentLoaded", handleQuantity);
  btnBuy.addEventListener("click", completeBuy);
  btnDelete.addEventListener("click", deleteCart);
  disableBtn(btnDelete);
  disableBtn(btnBuy);
  document.addEventListener("DOMContentLoaded", showTotalProductsInCart());
};

init();
