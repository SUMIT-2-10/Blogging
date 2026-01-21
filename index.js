require('dotenv').config();
const express = require('express');
const mongoDbConnect = require('./connection');
const path = require('path');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const router = require("./route/uesr")

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./view'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));
app.use(checkForAuthenticationCookie("token"));



mongoDbConnect(process.env.MONGODB_URL)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.get('/', (req, res) => {
  res.render('home')
});

app.use("/user", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});