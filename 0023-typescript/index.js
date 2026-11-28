function getDiscountedPrice(product, discount) {
  return product.price - product.price * discount;
}

const product = {
  title: "Sample Product",
  description: "This is a sample product",
  price: 100,
};

console.log(getDiscountedPrice(product, 0.2));
