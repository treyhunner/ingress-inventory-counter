(function () {

  "use strict";

  var fields, i;

  fields = [].slice.call(document.getElementsByTagName('input'), 0);

  function getTotal() {
    var sum = 0;
    fields.forEach(function (field) {
      sum += parseInt(field.value, 10) || 0;
    });
    return sum;
  }

  function setTotal(total) {
    document.getElementById('total').textContent = total;
  }

  function calculateTotal() {
    setTotal(getTotal());
  }

  fields.forEach(function (field) {
    field.oninput = calculateTotal;
  });

}());
