(function () {
    'use strict'; 
    
    var app = angular.module('App', []);
    
    app.controller('MainController', ['SeedService',
        function (SeedService) {
            this.posts = SeedService.data[0].posts;
        }
    ]);

    app.directive('nav', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                controllerAs: '__',
                template: $('#nav').html(),
                scope: {},

                controller: [
                    function () {
                        this.links = [
                            {href: '#', name: 'Mihail Gromov'},
                            {href: '#', name: 'Sean Kiernan'},
                            {href: '#', name: 'Patrick Romhanyi'}
                        ];
                    }
                ]
            };
        }
    ]);

    app.directive('aside', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                controllerAs: '__',
                template: $('#aside').html(),
                scope: {
                    collection: '=collection'
                },

                controller: ['SeedService', '$scope',
                    function (SeedService, $scope) {
                        this.links = populate(SeedService.data);

                        this.changePosts = function (index) {
                            $scope.collection = SeedService.data[index].posts;
                        };

                        function populate (collection) {
                            var array = [];
                            for (var i = 0; i < collection.length; i++)
                                array.push(collection[i].name);
                            return array;
                        }
                    }
                ]
            }
        }
    ]);

    app.directive('post', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                controllerAs: '__',
                template: $('#post').html(),
                scope: {
                    value: '=value',
                    month: '@month'
                },

                link: function (scope, element, attribute, controller) {
                    $(element).on('click', function (e) {
                        e.preventDefault();
                        controller.selected = controller.selected ? false : true;
                        scope.$apply();
                    });
                },

                controller: [
                    function () {
                        this.selected = false;
                    }
                ]
            }
        }
    ]);

    app.service('SeedService', [
        function () {
            this.data = [
                {
                    name: 'October',
                    posts: [
                        {
                            name: 'some_heading'
                            heading: 'Some Heading',
                            date: '10/10/2016',
                            text: 'Some content'
                        }
                }
            ];
        }
    ]);
}());