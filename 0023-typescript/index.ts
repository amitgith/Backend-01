type Product = {
  title: string;
  description: string;
  price: number;
};

function getDisountedPrice(product: Product, discount: number) {
  return product.price - product.price * discount;
}
const product = {
  title: "Product",
  description: "This is a sample product",
  price: 80,
};

console.log(getDisountedPrice(product, 0.2));
