require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const blog = require('./model/blog');

const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const mongoDbConnect = require('./connection');
const router = require("./route/uesr")
const blogRouter = require("./route/blog")

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

app.get('/', async (req, res) => {
  const allBlogs = await blog.find().populate('createdBy').sort({ createdAt: -1 });
  res.render('home', { allBlogs });
});

app.use("/user", router);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});