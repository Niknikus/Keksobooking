'use strict';
(function () {
  window.pinJs = {
    getPinDom: function (arr) {
      var newArrow = [];
      for (var i = 0; i < arr.length; i++) {
        var template = arr[i];
        var newObect = window.data.HTMLtemptlatePin.cloneNode(true);
        newObect.querySelector('.map__pin').setAttribute('style', 'left: ' + template.location.x + 'px; top: ' + template.location.y + 'px;');
        newObect.querySelector('.map__pin img').setAttribute('src', template.author.avatar);
        newObect.querySelector('.map__pin img').setAttribute('alt', template.offer.title);
        newArrow.push(newObect);
      }
      return newArrow;
    },
    getRenderingPins: function (arr, parent) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i <= arr.length - 1; i++) {
        fragment.appendChild(arr[i]);
      }
      parent.appendChild(fragment);
    }
  };

})();
