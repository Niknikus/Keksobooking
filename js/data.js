'use strict';
(function () {

  window.data = {
    map: document.querySelector('.map'),
    HTMLtemptlatePin: document.querySelector('#pin').content,
    mapPins: document.querySelector('.map__pins'),
    MAP_PIN_WIDTH: 62,
    MAP_PIN_HIGHT: 158,
    mapSizeX: document.querySelector('.map__overlay').clientWidth,
    returnArray: function (arr, newArray) {
      var temporary = {};
      newArray = [];
      for (var i = 0; i < arr.length; i++) {
        temporary = arr[i];
        newArray.push(temporary);
      }
      window.data.jsObjects = newArray;
      return window.data.jsObjects;
    }
  };

  window.backend.load(window.data.returnArray, window.backend.errorHandler);
})();
