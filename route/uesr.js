
const { Router } = require('express');
const User = require('../model/user');

const router = Router();

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signup", async (req, res) => {
    const { fullname, email, password } = req.body;
    console.log("Received data:", req.body); // Debug log
    await User.create({ fullname, email, password });
    return res.redirect("/");
});

module.exports = router;
