require('dotenv-safe').config();
const axios = require('axios');

const cuisineArr = require('../data/cuisines');

const zomatoApiKey = process.env.ZOMATO_KEY;
const spoonacularApiKey = process.env.SPOONACULAR_KEY;

const numOfResults = 5;

exports.getCity = (req, res) => {
  let queryURL = 'https://developers.zomato.com/api/v2.1/locations?query=' + req.params.city;
  axios({
    url: queryURL,
    method: 'get',
    headers: {
      'user-key': zomatoApiKey
    }
  })
  .then(result => {
    const response = result.data;
    let cityId;
    if (response.location_suggestions.length > 0) {
      cityId = response.location_suggestions[0].entity_id;
    } else {
      cityId = false;
    }
    res.json(cityId);
  })
  .catch(err => {
    if (err) throw err
  });
};

exports.getRestaurants = (req, res) => {
  let cuisineNum;
  let {cityid, cuisine, diet, meal} = req.query;

  switch (diet) {
      case 'pescatarian':
          diet = 'fish';
          break;
      case 'lacto vegetarian':
          diet = 'vegetarian';
          break;
      case 'ovo vegetarian':
          diet = 'vegetarian';
          break;
      default:
          break;
  }
  for (const c of cuisineArr) {
    if (c.cuisine_name === cuisine) cuisineNum = c.cuisine_id;
  }
  const queryURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' 
                  + cityid + '&entity_type=city&q=' + diet + '%20' + meal 
                  + '&count=' + numOfResults + '&cuisines=' + cuisineNum;
  axios({
      url: queryURL,
      method: 'get',
      headers: {
          'user-key': zomatoApiKey
      }
    })
    .then(result => {
      const response = result.data;
      const restoArr = [];

      for (let i = 0; i < response.restaurants.length; i++) {
          const resto = response.restaurants[i].restaurant;
          const restoInfo = {
              name: resto.name,
              address: resto.location.address,
              url: resto.url,
              cuisines: resto.cuisines.split(', '),
              avgCost: '$' + resto.average_cost_for_two,
              userScore: resto.user_rating.rating_text
          };
          restoArr.push(restoInfo);
      }
      res.json(restoArr);
  })
  .catch(err => {
    if (err) throw err
  });
};

exports.getRecipeIds = (req, res) =>{

  let { cuisine, intolerances, type, diet} = req.query;

  if (type !== "breakfast") type = "main+course";

  const queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?cuisine=' 
                  + cuisine + '&diet=' + diet + '&intolerances=' + intolerances 
                  + '&type=' + type + '&number=' + numOfResults + '&instructionsRequired=true&query=food';
  axios({
      url: queryURL,
      method: "get",
      headers: {
          "X-RapidAPI-Key": spoonacularApiKey
      }
  })
  .then(result => {
    const response = result.data;
    const recipeIdArr = [];
    for (let i = 0; i < response.results.length; i++) {
      recipeIdArr.push(response.results[i].id);
    }
    res.json(recipeIdArr);
  })
  .catch(err => {
    if (err) throw err
  });
};

exports.getRecipeInfo = (req, res) => {
  const id = req.params.id;
  const queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' 
                  + id + '/information?includeNutrition=true';
    axios({
      url: queryURL,
      method: 'get',
      headers: {
          "X-RapidAPI-Key": spoonacularApiKey
      }
    })
    .then(result => {
      const response = result.data;
      const recipeInfo = {
          title: response.title,
          image: response.image,
          prepTime: response.readyInMinutes + ' mins',
          instructions: response.instructions,
          url: response.spoonacularSourceUrl,
          cals: response.nutrition.nutrients[0].amount,
          protein: response.nutrition.nutrients[7].amount + ' g',
          fat: response.nutrition.nutrients[1].amount + ' g'
      }
      if (recipeInfo.instructions) {
          recipeInfo.instructions = recipeInfo.instructions.replace(/\s+/g,'  ').trim()
      }
      const ingredients = [];
      for (let i = 0; i < response.extendedIngredients.length; i++) {
          var ingredient = response.extendedIngredients[i];
          ingredients.push(ingredient.original);
      }
      recipeInfo.ingredients = ingredients;
      res.json(recipeInfo);
    })
    .catch(err => {
      if (err) throw err
    });
};