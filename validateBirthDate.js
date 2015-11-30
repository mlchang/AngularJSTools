healthnetworkApp.directive('validateBirthDate', function() {

  return {
    restrict: 'A',
    //form requirements:
    require: ['^form', '?ngModel'],
    link : function($scope, element, attrs, ctrl) {
              var index = attrs.name.charAt(attrs.name.length - 2);
              var prefix = '';
              var index2 = index;
              var indexSpouse = 0;
              if($scope.has_spouse){ 
                indexSpouse++;
              }
              if(index > 1){
                prefix = 'child'
                index = '$index'
              } else {
                prefix = 'plans'
              }
              var monthName = prefix + '_birthday_month_' + index;
              var dayName = prefix + '_birthday_day_' + index;
              var yearName = prefix + '_birthday_year_' + index;
              var inType = $scope.demographicsForm['insuranceType'].$viewValue;

              $scope.$watch(dayName, function(v){
                var month = $scope[prefix + '_birthday_month_' + index]; 
                var day = v; 
                var year = $scope[prefix +'_birthday_year_' + index];
                if(year > 2050){
                  year = 2050;
                }
                if(day){
                  if(index == 0){
                    $scope.primaryAge =  medicareEligible(day, month, year);
                  }
                  if(index == 1){
                    $scope.spouseAge =  medicareEligible(day, month, year);
                    $scope.$parent.$parent.spouseAge = $scope.spouseAge;
                    $scope.primaryAge = $scope.$parent.$parent.primaryAge;
                  }
                  if(validateMainDOB(day, month, year)){
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('InvalidDayForMonth', true);
                    //check eligibility
                    if($scope.insuranceType == 1){
                      if( $scope.primaryAge < 65 && ($scope.spouseAge < 65 || !$scope.has_spouse || ($scope.has_spouse === undefined))){
                        if(index == 1){ $scope.$parent.$parent.readyForModal = 0};
                        $scope.readyForModal = 0;
                        swapSubmit(0);
                      }
                      else if($scope.primaryAge > 64 && (!$scope.has_spouse || $scope.has_spouse === undefined) && ( !$scope.hasChildren || $scope.hasChildren === undefined )){
                        $scope.readyForModal = 1;
                        if(index == 1){ $scope.$parent.$parent.readyForModal = 1};
                        if($scope.demographicsForm.$valid){
                          swapSubmit(1);
                        }
                      } else{
                        $scope.readyForModal = 2;
                        if(index == 1){ $scope.$parent.$parent.readyForModal = 2};
                        if($scope.demographicsForm.$valid){
                          swapSubmit(2);
                        }
                      }
                    }
                  }else{
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('InvalidDayForMonth', false);
                  }

                  if($scope.insuranceType == 7 || $scope.insuranceType == 8 || $scope.insuranceType == 9 ){
                    if($scope.primaryAge < 65){
                      $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', false);
                    } else {
                      $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', true);
                    }    
                  }
                  else{
                    $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', true);
                  }
                  if(!validatePastDate(year,month,day)){
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('pastDate', false);
                  } else {
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('pastDate', true);
                  }
                }
                
              });

              $scope.$watch(yearName, function(v){
                var month = $scope[prefix + '_birthday_month_' + index]; 
                var day = $scope[prefix + '_birthday_day_' + index]; 
                var year = v;
                if(year > 2050){
                  year = 2050;
                }
                if(day){
                  if(index == 0){
                    $scope.primaryAge =  medicareEligible(day, month, year);
                  }
                  if(index == 1){
                    $scope.spouseAge =  medicareEligible(day, month, year);
                    $scope.$parent.$parent.spouseAge = $scope.spouseAge;
                    $scope.primaryAge = $scope.$parent.$parent.primaryAge;
                  }
                  if(validateMainDOB(day, month, year)){
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('InvalidDayForMonth', true);
                    //check eligibility


                    if($scope.insuranceType == 1){
                      if( $scope.primaryAge < 65 && ($scope.spouseAge < 65 || !$scope.has_spouse || ($scope.has_spouse === undefined))){
                        $scope.readyForModal = 0; if(index == 1){ $scope.$parent.$parent.readyForModal = 0};
                        swapSubmit(0);
                      }
                      else if($scope.primaryAge > 64 && (!$scope.has_spouse || $scope.has_spouse === undefined) && ( !$scope.hasChildren || $scope.hasChildren === undefined )){
                        if(index == 1){ $scope.$parent.$parent.readyForModal = 1};
                        $scope.readyForModal = 1;
                        if($scope.demographicsForm.$valid){
                          swapSubmit(1);
                        }
                      } else{
                        $scope.readyForModal = 2;
                        if(index == 1){ $scope.$parent.$parent.readyForModal = 2};
                        if($scope.demographicsForm.$valid){
                          swapSubmit(2);
                        }
                      }
                    }
                  }else{
                    ctrl[0][attrs.name].$setValidity('InvalidDayForMonth', false);
                  }

                  if($scope.insuranceType == 7 || $scope.insuranceType == 8 || $scope.insuranceType == 9 ){
                    if($scope.primaryAge < 65){
                      $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', false);
                    } else {
                      $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', true);
                    }   
                  }
                  else{
                    $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', true);
                  }
                  if(!validatePastDate(year,month,day)){
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('pastDate', false);
                  } else {
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('pastDate', true);
                  }
                }
                
              });

              $scope.$watch(monthName, function(v){
                var month = v; 
                var day = $scope[ prefix + '_birthday_day_' + index]; 
                var year = $scope[prefix + '_birthday_year_' + index]; 
                if(year > 2050){
                  year = 2050;
                }
                if(day){
                  if(index == 0){
                    $scope.primaryAge =  medicareEligible(day, month, year);
                  }
                  if(index == 1){
                    $scope.spouseAge =  medicareEligible(day, month, year);
                    $scope.$parent.$parent.spouseAge = $scope.spouseAge;
                    $scope.primaryAge = $scope.$parent.$parent.primaryAge;
                  }
                  if(validateMainDOB(day, month, year)){
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('InvalidDayForMonth', true);
                    //check eligibility
                    if($scope.insuranceType == 1){
                      if( $scope.primaryAge < 65 && ($scope.spouseAge < 65 || !$scope.has_spouse || ($scope.has_spouse === undefined))){
                        $scope.readyForModal = 0;
                        if(index == 1){ $scope.$parent.$parent.readyForModal = 0};
                        swapSubmit(0);
                      }
                      else if($scope.primaryAge > 64 && (!$scope.has_spouse || $scope.has_spouse === undefined) && ( !$scope.hasChildren || $scope.hasChildren === undefined )){
                        $scope.readyForModal = 1;
                        if(index == 1){ $scope.$parent.$parent.readyForModal = 1};
                        if($scope.demographicsForm.$valid){
                          swapSubmit(1);
                        }
                      } else{
                        $scope.readyForModal = 2;
                        if(index == 1){ $scope.$parent.$parent.readyForModal = 2};
                        if($scope.demographicsForm.$valid){
                          swapSubmit(2);
                        }
                      }
                    }
                  }else{
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('InvalidDayForMonth', false);
                  }

                  if($scope.insuranceType == 7 || $scope.insuranceType == 8 || $scope.insuranceType == 9 ){
                    if($scope.primaryAge < 65){
                      $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', false);
                    } else {
                      $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', true);
                    }    
                  }
                  else{
                    $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', true);
                  }
                  if(!validatePastDate(year,month,day)){
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('pastDate', false);
                  } else {
                    $scope.demographicsForm['plans_birthday_day['+ index2 + ']'].$setValidity('pastDate', true);
                  }
                }
              });

              
            }
          }
});

healthnetworkApp.directive('childBirthDate', function() {

  return {
    restrict: 'A',
    require: "ngModel",
    link : function($scope, element, attrs, ngModel) {

                var month;
                var day;
                var year;
              $scope.$watch('child_birthday_day_$index', function(newVal){

                day = newVal;
                var index = attrs.name.charAt(attrs.name.length - 2);
                if(day && year && month){
                  if(year > 2050){
                    year = 2050;
                  }
                  if(validateMainDOB(day, month, year)){
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('InvalidDayForMonth', true);
                    //check eligibility
                  }else{
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('InvalidDayForMonth', false);
                  }

                  if(!validatePastDate(year,month,day)){
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('pastDate', false);
                  } else {
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('pastDate', true);
                  }
                }
                
              });
              $scope.$watch('child_birthday_month_$index', function(newVal, oldVal){
                month = newVal;
                var index = attrs.name.charAt(attrs.name.length - 2);
                if(day && year && month){
                  if(year > 2050){
                    year = 2050;
                  }
                  if(validateMainDOB(day, month, year)){
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('InvalidDayForMonth', true);
                    //check eligibility
                  }else{
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('InvalidDayForMonth', false);
                  }

                  if(!validatePastDate(year,month,day)){
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('pastDate', false);
                  } else {
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('pastDate', true);
                  }
                }
              });
              $scope.$watch('child_birthday_year_$index', function(newVal, oldVal){
                year = newVal;
                var index = attrs.name.charAt(attrs.name.length - 2);
                if(day && year && month){
                  if(year > 2050){
                    year = 2050;
                  }
                  if(validateMainDOB(day, month, year)){
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('InvalidDayForMonth', true);
                    //check eligibility
                  }else{
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('InvalidDayForMonth', false);
                  }

                  if(!validatePastDate(year,month,day)){
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('pastDate', false);
                  } else {
                    $scope.demographicsForm['plans_birthday_day['+ index + ']'].$setValidity('pastDate', true);
                  }
                }
              });

            }
          }
});

healthnetworkApp.directive('saveSpouseInfo', function() {

  return {
    restrict: 'A',
    require: "ngModel",
    link : function($scope, element, attrs, ngModel) {
                var month;
                var day;
                var year;
                $scope.$watch(attrs.ngModel, function(newVal){
                  $scope.spouseData[attrs.ngModel] = newVal;
                });

            }
          }
});

//add directive to watch spouse button
healthnetworkApp.directive('healthcareInputSwitch', function() {

  return {
    restrict: 'A',
    //form requirements:
    require: 'ngModel',
    link : function($scope, element, attrs, ngModel) {
                
                $scope.$watch(attrs.ngModel, function(v){
                  var inType = 1;
                  if($scope.demographicsForm){
                    var inType = $scope.demographicsForm['insuranceType'].$viewValue
                  }
                  var primaryAge = medicareEligible($scope.plans_birthday_day_0, $scope.plans_birthday_month_0, $scope.plans_birthday_year_0);
                  var spouseAge = medicareEligible($scope.plans_birthday_day_1, $scope.plans_birthday_month_1, $scope.plans_birthday_year_1);
                  if(inType == 7 || inType == 8 || inType == 9){
                    swapSubmit(0);
                    $scope.readyForModal = 0;
                    if(primaryAge < 65){
                      $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', false);
                    }
                  }
                
                  if(inType == 1){
                    $scope.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', true);
                      if( primaryAge < 65 && (spouseAge < 65 || !$scope.has_spouse || ($scope.has_spouse === undefined))){
                        $scope.readyForModal = 0;
                        swapSubmit(0);
                      }
                      else if(primaryAge > 64 && (!$scope.has_spouse || $scope.has_spouse === undefined) && ( !$scope.hasChildren || $scope.hasChildren === undefined )){
                        $scope.readyForModal = 1;
                        if($scope.demographicsForm.$valid){
                          swapSubmit(1);
                        }
                      } else{
                        $scope.readyForModal = 2;
                        if($scope.demographicsForm.$valid){
                          swapSubmit(2);
                        }
                      }
                  }
              });
            }
          }
});

healthnetworkApp.directive('healthcarePlusSwitch', function() {

  return {
    restrict: 'A',
    //form requirements:
    require: 'ngModel',
    link : function($scope, element, attrs, ngModel) {
                
                $scope.$watch(attrs.ngModel, function(v){
                  var inType = 1;
                  var inType = $scope.$parent.demographicsForm['insuranceType'].$viewValue
                  
                  var primaryAge = medicareEligible($scope.$parent.plans_birthday_day_0, $scope.$parent.plans_birthday_month_0, $scope.$parent.plans_birthday_year_0);
                  var spouseAge = medicareEligible($scope.$parent.plans_birthday_day_1, $scope.$parent.plans_birthday_month_1, $scope.$parent.plans_birthday_year_1);
                  if(inType == 7 || inType == 8 || inType == 9){
                    swapSubmit(0);
                    $scope.$parent.readyForModal = 0;
                    if(primaryAge < 65){
                      $scope.$parent.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', false);
                    }
                  }
                
                  if(inType == 1){
                    $scope.$parent.demographicsForm['plans_birthday_day[0]'].$setValidity('youngForMedicare', true);
                      if( primaryAge < 65 && (spouseAge < 65 || !$scope.has_spouse || ($scope.has_spouse === undefined))){
                        $scope.$parent.readyForModal = 0;
                        swapSubmit(0);
                      }
                      else if(primaryAge > 64 && (!$scope.has_spouse || $scope.has_spouse === undefined) && ( !$scope.hasChildren || $scope.hasChildren === undefined )){
                        $scope.$parent.readyForModal = 1;
                        if($scope.$parent.demographicsForm.$valid){
                          swapSubmit(1);
                        }
                      } else{
                        $scope.$parent.readyForModal = 2;
                        if($scope.$parent.demographicsForm.$valid){
                          swapSubmit(2);
                        }
                      }
                  }
              });
            }
          }
});


  var daysInMonth = function(m, y) { // m is 0 indexed: 0-11
      switch (m) {
          case 1 :
              return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
          case 8 : case 3 : case 5 : case 10 :
              return 30;
          default :
              return 31
      }
  }
  
  var validateMainDOB = function(d, m, y) {
    var d = Number(d),
    m = Number(m),
    m = m - 1, // Because m is 0 index based in daysInMonth
    
    y = Number(y);
      return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
  };
  
  var validatePastDate = function(y,m,d) {
    
    if (!y || !m || !d) {
      return false;
    }
    
      if (d < 10) {
        var d = ('0' + d).slice(-2);
      };
      
      if (m < 10) {
        var m = ('0' + m).slice(-2);
      };

    var givenDate = y + '' + m + '' + d;
    
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      
      if (dd < 10) {
        var dd = ('0' + dd).slice(-2);
      };
      
      if (mm < 10) {
        var mm = ('0' + mm).slice(-2);
      };
      
      var fullDate = yyyy + '' + mm + '' + dd;
      
      // If the answer is negative then the givenDate is in the future
      var dateTest = Number(fullDate) - Number(givenDate);
    if (dateTest < 0) {
      return false
    } else {
      return true;
    }
  }; 

  var medicareEligible = function(d, m, y){
    if (!y || !d || !m || y < 1885) {
      return 0;
    }
    var birthDate = new Date(y, m-1, d);
    var todayAgeDifMs = Date.now() - birthDate.getTime();
    var ageDate = new Date(todayAgeDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
}