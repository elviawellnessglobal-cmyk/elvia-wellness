const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@naerawellness.com",
    password: hashedPassword,
  });

  console.log("Admin created");
  process.exit();
}

createAdmin();
