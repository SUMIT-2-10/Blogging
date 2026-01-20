require('dotenv').config();
const express = require('express');
const mongoDbConnect = require('./connection');
const path = require('path');

const router = require("./route/uesr")

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./view'));

app.get('/', (req, res) => {
  res.render('home')
});

app.use(express.urlencoded({ extended: true }));
mongoDbConnect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/user", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});