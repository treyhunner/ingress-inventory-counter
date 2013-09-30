(function () {

  "use strict";

  var fields, hasLocalStorage, shareLink, i;

  fields = [].slice.call(document.getElementsByTagName('input'), 0);
  shareLink = document.getElementById('shareLink');

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

  function setStorageFromURL() {
    var storage, key;
    if (window.location.hash) {
      storage = JSON.parse(atob(window.location.hash.slice(1)));
    }
    for (key in storage) {
      if (storage.hasOwnProperty(key)) {
        localStorage[key] = storage[key];
      }
    }
  }

  function setInitialFields() {
    fields.forEach(function (field) {
      field.value = parseInt(localStorage[field.name], 10) || "";
    });
  }

  function storeFields() {
    fields.forEach(function (field) {
      localStorage[field.name] = field.value;
    });
  }

  function updateShareLink() {
    shareLink.href = '#' + btoa(JSON.stringify(localStorage));
  }

  fields.forEach(function (field) {
    field.oninput = function () {
      updateTotal();
      if (hasLocalStorage) {
        storeFields();
      }
      updateShareLink();
    };
    field.onclick = function () {
      field.select();
    };
  });

  setStorageFromURL();
  setInitialFields();
  updateTotal();
  updateShareLink();

}());
