'use strict';

(function () {
  window.utils = {
    getRandom: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },
    shuffle: function (array) {
      for (var i = array.length - 1, r, t; i > 0; i--) {
        r = Math.floor(Math.random() * i);
        t = array[i];
        array[i] = array[r];
        array[r] = t;
      }

      return array;
    },
    getUnicArray: function (arr) {
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var newKey = arr[i];
        obj[newKey] = true;
      }
      return Object.keys(obj);
    },
    getNumbers: function (quantity) {
      var arr = [];
      var number = 0;
      for (var i = 1; i <= quantity; i++) {
        number = i;
        arr.push(number);
      }
      window.utils.shuffle(arr);
      return arr;
    },
    getRandomLenghtArrow: function (arr) {
      var newArrow = [];
      for (var i = 0; i <= Math.floor(Math.random() * arr.length); i++) {
        var g = window.utils.getRandom(0, arr.length - 1);
        newArrow.push(arr[g]);
      }
      newArrow = window.utils.getUnicArray(newArrow);
      return newArrow;
    }
  };
})();
