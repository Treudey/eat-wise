const express = require('express');

const apiController = require('../controllers/api');

const router = express.Router();

// GET city ID through zomato
router.get('/city/:city', apiController.getCity);

// GET restaurants from zomato
router.get('/restaurants', apiController.getRestaurants);

// GET recipe IDs from spoonacular
router.get('/recipes', apiController.getRecipeIds);

// GET recipe info from spoonacular
router.get('/recipe/:id', apiController.getRecipeInfo);

module.exports = router;
