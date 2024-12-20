const express = require('express');
const router = express.Router();

// Import controllers
const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');

// User Routes
router.post('/signup', userSignUpController);        // POST /api/signup
router.post('/signin', userSignInController);        // POST /api/signin
router.get('/user-details', authToken, userDetailsController); // GET /api/user-details
router.get('/logout', authToken, userLogout);                    // GET /api/logout
router.get('/logout', userLogout);  

// Admin Routes
router.get('/all-users', authToken, allUsers);       // GET /api/all-users
router.post('/update-user', authToken, updateUser);  // POST /api/update-user

// Product Routes
router.post('/upload-product', authToken, uploadProductController);  // POST /api/upload-product
router.get('/products', getProductController);      // GET /api/products
router.post('/update-product', authToken, updateProductController);  // POST /api/update-product
router.get('/category-products', getCategoryProduct); // GET /api/category-products
router.post('/category-wise-products', getCategoryWiseProduct); // POST /api/category-wise-products
router.post('/product-details', getProductDetails); // POST /api/product-details
router.get('/search', searchProduct);               // GET /api/search
router.post('/filter-products', filterProductController); // POST /api/filter-products

// Cart Routes
router.post('/add-to-cart', authToken, addToCartController);       // POST /api/add-to-cart
router.get('/cart-count', authToken, countAddToCartProduct);       // GET /api/cart-count
router.get('/cart-items', authToken, addToCartViewProduct);        // GET /api/cart-items
router.post('/update-cart', authToken, updateAddToCartProduct);    // POST /api/update-cart
router.post('/delete-cart', authToken, deleteAddToCartProduct);    // POST /api/delete-cart

module.exports = router;
