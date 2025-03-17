const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));
};

module.exports = connectDB;