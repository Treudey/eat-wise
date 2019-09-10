// API CALLS CONTROLLER
var APIController = (function() {
    // All javascript dealing with Zomato and Spoonacular APIs goes here
    return {
        zomatoGetCityNumber: function(callback, city) {
          var queryURL = '/api/city/' + city;
          $.get(queryURL, callback);
        },
        zomatoSearch: function(callback, cityID, cuisine, diet, mealType) {
          var queryURL = '/api/restaurants?cityid=' + cityID + '&cuisine=' 
                          + cuisine + '&diet=' + diet + '&meal=' + mealType;
          $.get(queryURL, callback);
        },
        spoonacularGetRecipeIDs: function(callback, cuisine, intolerances, type, diet) {
          var intolerancesStr = "";
          cuisine = cuisine.replace(' ', '+');
          diet = diet.replace(' ', '+');
          for (var i = 0; i < intolerances.length; i++) {
              intolerancesStr += intolerances[i];
              if (i !== intolerances.length - 1) {
                  intolerancesStr += '%2C'
              }
          }

          var queryURL = '/api/recipes?cuisine=' + cuisine + '&intolerances=' 
                          + intolerancesStr + '&diet=' + diet + '&type=' + type;
          $.get(queryURL, callback);
        },
        spoonacularGetRecipeInfo: function(callback, id) {
          var queryURL = '/api/recipe/' + id;
          $.get(queryURL, callback);
        }
    };
})();