(function () {

  "use strict";

  var fields, hasLocalStorage, i;

  fields = [].slice.call(document.getElementsByTagName('input'), 0);

  hasLocalStorage = (function (){
    try {
      localStorage.setItem('localStorage-test', true);
      localStorage.removeItem('localStorage-test');
      return true;
    } catch (e) {
      return false;
    }
  }());

  function updateTotal() {
    var sum = 0;
    fields.forEach(function (field) {
      sum += parseInt(field.value, 10) || 0;
    });
    document.getElementById('total').textContent = sum;
  }

  function setFieldsFromStorage() {
    fields.forEach(function (field) {
      field.value = parseInt(localStorage[field.name], 10) || "";
    });
  }

  function storeFields() {
    fields.forEach(function (field) {
      localStorage[field.name] = field.value;
    });
  }

  fields.forEach(function (field) {
    field.oninput = function () {
      updateTotal();
      if (hasLocalStorage) {
        storeFields();
      }
    };
    field.onclick = function () {
      field.select();
    };
  });

  setFieldsFromStorage();
  updateTotal();

}());
