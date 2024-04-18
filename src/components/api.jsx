const products = [
  {
    id: 1,
    name: "Product 1",
    producer: "Producer 1",
    type: "t-shirt",
    price: 899,
    images: [
      "https://fullsourcemedia.s3.amazonaws.com/images/items/b/raw/5000_Orange_1_A.jpg",
      "https://cdn1.bambinifashion.com/img/p/1/8/3/9/8/2/183982--product.jpg",
    ],
    sizes: ["XL", "L", "M", "S"],
    colors: ["#000000", "#FFFFFF", "#FF0000", "#00FF00"],
    rating: 4,
    reviews: 120,
  },
  {
    id: 2,
    name: "Product 2",
    producer: "Producer 2",
    type: "jeans",
    price: 1499,
    images: [
      "https://example.com/product2-image1.jpg",
      "https://example.com/product2-image2.jpg",
      "https://example.com/product2-image3.jpg",
      "https://example.com/product2-image4.jpg",
    ],
    sizes: ["XL", "L", "M", "S"],
    colors: ["#000000", "#0000FF", "#FF0000", "#FFFF00"],
    rating: 4.5,
    reviews: 85,
  },
  // Add more dummy products as needed
];

export const getProductById = (id) => {
  return new Promise((resolve) => {
    const product = products.find((product) => product.id === parseInt(id));
    setTimeout(() => {
      resolve(product);
    }, 1000);
  });
};
