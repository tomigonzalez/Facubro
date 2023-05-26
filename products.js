const products = [
  {
    id: 1,
    category: "Nike",
    nombre: "Nike Max Advantage",
    cantidad: 1,
    precio: "20000",
    img: "fotos/adidasMaxAdvantage.png",
  },
  {
    id: 2,
    category: "Adidas",
    nombre: "Adidas Air max Furiozas",
    cantidad: 1,
    precio: 15000,
    img: "fotos/airmaxfurioza.png",
  },
  {
    id: 3,
    category: "Nike",
    nombre: "Nike Giannis Immortality",
    cantidad: 1,
    precio: 15700,
    img: "fotos/GiannisImmortality.png",
  },
  {
    id: 4,
    category: "New",
    nombre: "New Balance Disrurt",
    cantidad: 1,
    precio: 13000,
    img: "fotos/newbalancedisrurt.png",
  },
  {
    id: 5,
    category: "Nike",
    nombre: "Nike Lebron",
    cantidad: 1,
    precio: 35000,
    img: "fotos/nikelebron.png",
  },
  {
    id: 6,
    category: "Nike",
    nombre: "Nike Ozelia",
    recommended: true,
    cantidad: 1,
    precio: 16000,
    img: "fotos/ozeliaa.png",
  },
  {
    id: 7,
    category: "Adidas",
    nombre: "Adidas Ozweego",
    cantidad: 1,
    precio: 14000,
    img: "fotos/Ozweego.png",
    recommended: true,
  },
  {
    id: 8,
    category: "DC",
    nombre: "DC Pure",
    cantidad: 1,
    recommended: true,
    precio: 12000,
    img: "fotos/pure.png",
  },
  {
    id: 9,
    category: "Adidas",
    nombre: "Adidas Yezze 750",
    cantidad: 1,
    recommended: true,
    precio: 14000,
    img: "fotos/yezze750.png",
  },
  {
    id: 10,
    category: "DC",
    nombre: "DC Metric",
    cantidad: 1,
    recommended: true,
    precio: 9000,
    img: "fotos/dcmetric.png",
  },
];
const mostPopularProducts = () => {
  const popularProducts = [];

  for (let i = 0; i < products.length; i++) {
    popularProducts.push(products[i]);
  }
  return popularProducts;
};
