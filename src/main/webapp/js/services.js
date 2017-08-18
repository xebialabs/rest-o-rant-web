var restorantServices = angular.module('restorantServices', []);

restorantServices.factory('Restaurant', ['$resource',
  function($resource){
    return $resource('/api/findrestaurants', {}, {
            query: {
                method: 'GET',
                responseType: 'json',
                isArray: true,
                params: {},
                transformResponse: function (response) {
                    var locations = ["Grachtengordel", "Binnenstad/Burgwallen"];
                    var cuisines = ["European", "Steak"];
                    var images = ["img/rest-o-rant-image1.jpg", "img/rest-o-rant-image2.jpg"];

                    function randomNumber(maximumNumber){
                      return Math.floor(Math.random() * (maximumNumber));
                    }

                    var wrapped = angular.fromJson(response);
                     angular.forEach(wrapped, function(item) {
                       item.image = images[randomNumber(images.length)];
                       item.rating = randomNumber(5) + 1;
                       item.reviews = randomNumber(200);
                       item.recommended = randomNumber(100) + 1;
                       item.cuisine = cuisines[randomNumber(cuisines.length)];
                       item.location = locations[randomNumber(locations.length)];
                       item.booked = randomNumber(20);
                     });
                     return wrapped;

                }
            }
        });
}]);
