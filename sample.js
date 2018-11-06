var app=angular.module('myApp', []);

 

// alternate - https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination

// alternate - http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/paginating-through-client-side-data.html

 

app.controller('MyCtrl', ['$scope', '$filter', function ($scope, $filter) {

    $scope.currentPage = 0;

    $scope.pageSize = 10;

    $scope.pageCount = 5;

    $scope.startIndex = 0;

    $scope.tableStartIndex = 0;

    $scope.data = [];

    $scope.pages = [];

    $scope.q = '';

    for (var i=1; i<101; i++) {

        $scope.data.push({id:i,name:'Mr.'+i+'Man',age:2+i});

    }

   

    $scope.numberOfPages =Math.ceil($scope.data.length/$scope.pageSize);    

    for (var i=1; i<$scope.numberOfPages+1; i++) {

        $scope.pages.push(i);

    }

   

    console.log("Number of pages="+ $scope.numberOfPages);

 

    $scope.nextPage=function(){

        console.log("startIndex="+$scope.startIndex);

        if(($scope.startIndex+  $scope.pageCount)<  $scope.numberOfPages){

               $scope.startIndex=$scope.startIndex+1;

        }

    };

   

    $scope.previousPage=function(){

      

       if( $scope.startIndex > 0){

               $scope.startIndex=$scope.startIndex-1;

       }

   };

  

   $scope.loadToThisPage=function(page){

             

    console.log("Selected page"+page);

    $scope.tableStartIndex = (page-1)*$scope.pageSize;

    console.log("tableStartIndex"+$scope.tableStartIndex);

  };

 

  $scope.firstPage=function(){

         $scope.startIndex = 0;

         $scope.tableStartIndex = 0;

  };

 

 $scope.lastPage=function(){

       $scope.startIndex =  $scope.numberOfPages-$scope.pageCount;

         $scope.tableStartIndex = ($scope.numberOfPages-1)*$scope.pageSize;

         console.log("startIndex="+$scope.startIndex);

         console.log("tableStartIndex"+$scope.tableStartIndex);

  };

 

  $scope.valueChanged=function(){

         $scope.startIndex = 0;

         $scope.tableStartIndex = 0;

         $scope.pages = [];

         $scope.numberOfPages =Math.ceil($scope.data.length/$scope.pageSize);    

           for (var i=1; i<$scope.numberOfPages+1; i++) {

               $scope.pages.push(i);

           }

           if( $scope.pageCount >$scope.numberOfPages){

              $scope.pageCount=$scope.numberOfPages;

           }

  };

 

}]);

//We already have a limitTo filter built-in to angular,

//let's make a startFrom filter

app.filter('startFrom', function() {

    return function(input, start) {

        start = +start; //parse to int

        return input.slice(start);

    };

});