'use strict';
(function () {
  window.map = {};


  // main pin address and write down in input "Адрес"

  var mainPin = window.data.map.querySelector('.map__pin--main');
  var mainPinX = mainPin.offsetLeft;
  var mainPinY = mainPin.offsetTop;
  var inputNoticeFormAdress = document.querySelector('#address');
  inputNoticeFormAdress.setAttribute('value', 'x: ' + (mainPinX + window.data.MAP_PIN_WIDTH / 2) + ', ' + 'y: ' + (mainPinY + window.data.MAP_PIN_HIGHT / 2));

  // emulating of pin dragging
  var onMousUpOnce = function (evt) {
    evt.preventDefault();
    window.map.DOMpins = window.pinJs.getPinDom(window.data.jsObjects);
    window.data.map.classList.remove('map--faded');
    window.pinJs.getRenderingPins(window.map.DOMpins, window.data.mapPins);
    window.form.noticeForm.classList.remove('ad-form--disabled');
    window.form.setDisabledFalse(window.form.noticeForm);
    window.form.noticeFieldsets.forEach(function (item) {
      window.form.setDisabledFalse(item);
    }
    );
    mainPin.removeEventListener('mouseup', onMousUpOnce);
  };
  mainPin.addEventListener('mouseup', onMousUpOnce);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var start = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMoving = function (mevt) {
      mevt.preventDefault();
      var checkingPosition = function (nod) {
        var x = nod.offsetLeft;
        var y = nod.offsetTop;
        if (x < -30) {
          nod.style.left = -30 + 'px';
        } else if (x > 1165) {
          nod.style.left = 1165 + 'px';
        } else if (y < 0) {
          nod.style.top = 0 + 'px';
        } else if (y > 620) {
          nod.style.top = 620 + 'px';
        }
      };

      checkingPosition(mainPin);

      var shift = {
        x: start.x - mevt.clientX,
        y: start.y - mevt.clientY
      };

      start.x = mevt.clientX;
      start.y = mevt.clientY;
      mainPinX = mainPin.offsetLeft;
      mainPinY = mainPin.offsetTop;

      mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
      mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      inputNoticeFormAdress.setAttribute('value', 'x: ' + (mainPinX + window.data.MAP_PIN_WIDTH / 2) + ', ' + 'y: ' + (mainPinY + window.data.MAP_PIN_HIGHT / 2));
    };

    var onMouseUp = function (uvt) {
      uvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMoving);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMoving);
    document.addEventListener('mouseup', onMouseUp);
  });


  window.data.map.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    var cardCloseButton = window.data.map.querySelector('.popup__close');
    if (target === cardCloseButton) {
      window.data.map.removeChild(target.parentNode);
    }
  }, true);

  // //event opening advertising card with pin click

  window.data.map.addEventListener('click', function (evt) {
    var target = evt.target;
    var targetClass = target.getAttribute('class');
    var targetTag = target.tagName;
    var targetParentClass = target.parentNode.getAttribute('class');

    // if click was on image, and not on the button Pin, we reinitializate target.
    // With it, in any case, we will work with button element.

    if (targetClass !== 'map__pin map__pin--main' && (targetClass === 'map__pin' || (targetTag === 'IMG' && targetParentClass !== 'map__pin map__pin--main'))) {

      if (target.tagName === 'IMG') {
        target = target.parentNode;
      }

      // remove card, if DOM has it

      if (window.data.map.querySelector('.map__card')) {
        var mapCard = window.data.map.querySelector('.map__card');
        window.data.map.removeChild(mapCard);
      }

      // here we are removing active class from some active element, and
      // set the class on our target.

      if (window.data.mapPins.querySelector('.map__pin--active')) {
        window.data.mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      target.classList.add('map__pin--active');

      // here we will find correct index for jsObjects temptlate, for our card.
      // It was a hard part of code for me.

      var correctIndex;
      for (var i = 1; i <= window.data.jsObjects.length; i++) {
        if (window.data.mapPins.querySelectorAll('.map__pin')[i].getAttribute('class') === 'map__pin map__pin--active') {
          correctIndex = i - 1;
        }
      }

      // and now we just put correct temptlate for our function createDOMmapCard,
      // and isert in HTML with fragment.

      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.createDOMmapCard(window.data.jsObjects[correctIndex]));
      var beforeElement = window.data.map.children[1];
      window.data.map.insertBefore(fragment, beforeElement);
    }
  }, true);
})();
