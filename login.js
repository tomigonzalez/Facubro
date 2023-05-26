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
