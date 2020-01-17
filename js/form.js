'use strict';

(function () {
  var x = document.querySelector('.ad-form');
  var y = x.querySelectorAll('fieldset');
  // set fieldset advertising form disabled
  window.form = {
    noticeForm: x,
    noticeFieldsets: y,
    setDisabledTrue: function (item) {
      item.setAttribute('disabled', 'disabled');
    },
    setDisabledFalse: function (item) {
      item.removeAttribute('disabled');
    },
    clearForm: function () {
      x.reset();
    }
  };

  x.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(x), window.form.clearForm, window.backend.errorHandler);
  });


  window.form.setDisabledTrue(window.form.noticeForm);
  window.form.noticeFieldsets.forEach(function (item) {
    window.form.setDisabledTrue(item);
  });
  // validation for maching room quantity with capacity

  var roomQuantity = document.querySelector('#room_number');
  var capacityGuests = document.querySelector('#capacity');

  roomQuantity.addEventListener('change', function (evt) {
    evt.preventDefault();
    if (roomQuantity.value < capacityGuests.value) {
      evt.target.setCustomValidity('У вас слишком мало комнат для гостей!');
    } else {
      evt.target.setCustomValidity('');
      capacityGuests.setCustomValidity('');
    }
  });

  capacityGuests.addEventListener('change', function (evt) {
    evt.preventDefault();
    if (roomQuantity.value < capacityGuests.value) {
      evt.target.setCustomValidity('У вас слишком много гостей!');
    } else {
      evt.target.setCustomValidity('');
    }
  });
})();
