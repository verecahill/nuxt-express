const express = require("express");

const rootDir = require('../util/path');

const router = express.Router();
const path = require("path");

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
});

// admin/add-product -> post
router.post("/add-product", (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
