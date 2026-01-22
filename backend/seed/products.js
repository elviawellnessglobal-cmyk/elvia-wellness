require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

mongoose.connect(process.env.MONGO_URI);

const products = [
  // SKINCARE
  {
    productId: "haetsal-veil-spf50",
    name: "Haetsal Veil™ SPF 50+ PA++++",
    slug: "haetsal-veil-cream",
    category: "skincare",
    price: 2499,
    images: [],
  },
  {
    productId: "haetsal-veil-spray-spf50",
    name: "Haetsal Veil™ Spray SPF 50+ PA++++",
    slug: "haetsal-veil-spray",
    category: "skincare",
    price: 1999,
    images: [],
  },

  // PERFUMES
  {
    productId: "perfume-soft-skin",
    name: "THÉ NOIR MEN",
    slug: "soft-skin",
    category: "perfume",
    price: 3499,
    images: [],
  },
  {
    productId: "perfume-morning-veil",
    name: "Morning Veil",
    slug: "morning-veil",
    category: "perfume",
    price: 3499,
    images: [],
  },
  {
    productId: "perfume-quiet-woods",
    name: "SOIE FEMME",
    slug: "quiet-woods",
    category: "perfume",
    price: 3499,
    images: [],
  },
];

(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Products seeded successfully");
  process.exit();
})();
