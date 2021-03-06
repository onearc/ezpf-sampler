var parseConfig = {};
parseConfig.appId = '5Md6MIrUHZl05WPqUaBOiIrWaD7HUtCRSdpR1CoU';
parseConfig.apiKey = 'u5hZVTcAKnjef8lxrD9pfoIJWtBuV3u4RPa3O4n8';
parseConfig.baseUrl = 'https://api.parse.com/1/';

var parstangularModule = angular.module("parstangular", ['restangular']);

parstangularModule.constant("parseConfig", parseConfig);

parstangularModule.config(function (RestangularProvider) {

    // Now let's configure the response extractor for each request
    RestangularProvider.setResponseExtractor(function (response, operation, what, url) {
        // This is a get for a list
        var newResponse;
        if (operation === "getList") {
            // Here we're returning an Array which has one special property metadata with our extra information
            newResponse = response.results;
        }
        return newResponse;
    });

});

var parseApiFactory = parstangularModule.factory('parseApi', ['Restangular', 'parseConfig',

    function (Restangular, parseConfig) {

        var newApi = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(parseConfig.baseUrl);
            RestangularConfigurer.setDefaultHeaders({
                'X-Parse-Application-Id': parseConfig.appId,
                'X-Parse-REST-API-Key': parseConfig.apiKey
            });
            RestangularConfigurer.setRestangularFields({
                id: "objectId",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            });

        });

        //        newApi.prototype.parseObject = function (objName) {
        //
        //            return this.all("classes").all(objName);
        //        };
        return newApi;
    }]);

var parseClassFactory = parstangularModule.factory('parseClasses', ['parseApi',

    function (parseApi) {

        return parseApi.all('classes');

        }]);