healthnetworkApp.directive('requiredMessage', function() {
  return {
    template: '<p class="text-danger"><span class="validation-error">!</span>This field is required.</p>'
  };
});