'use strict';

(function () {
  window.card = {
    TransformType: {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    },
    createDOMmapCard: function (template) {
      var advertising = document.querySelector('#card').content.cloneNode(true);
      var temptlateFeatures = advertising.querySelector('.popup__features');
      var temptlateFeaturesElements = temptlateFeatures.querySelectorAll('li');
      var temptlatePhotos = advertising.querySelector('.popup__photos');
      var temptlatePhotosElement = temptlatePhotos.querySelectorAll('.popup__photos img');
      advertising.querySelector('.map__card img').setAttribute('src', template.author.avatar);
      advertising.querySelector('.popup__title').textContent = template.offer.title;
      advertising.querySelector('.popup__text--address').textContent = template.offer.address;
      advertising.querySelector('.popup__text--price').innerHTML = template.offer.price + ' ' + '&#8381' + '/ночь';
      advertising.querySelector('.popup__type').textContent = window.card.TransformType[template.offer.type].toUpperCase();
      advertising.querySelector('.popup__text--capacity').textContent = template.offer.rooms + ' комнаты для ' + template.offer.guests + ' гостей.';
      advertising.querySelector('.popup__text--time').textContent = 'Заезд после ' + template.offer.checkin + ', выезд до ' + template.offer.checkout + '.';
      temptlateFeaturesElements.forEach(function (item) {
        temptlateFeatures.removeChild(item);
      });
      template.offer.features.forEach(function (item) {
        var li = document.createElement('li');
        li.setAttribute('class', 'popup__feature popup__feature--' + item);
        temptlateFeatures.appendChild(li);
      });
      temptlatePhotosElement.forEach(function (item) {
        temptlatePhotos.removeChild(item);
      });
      template.offer.photos.forEach(function (item) {
        var div = document.createElement('div');
        var img = document.createElement('img');
        img.setAttribute('class', 'popup__photo');
        img.setAttribute('width', '45');
        img.setAttribute('height', '40');
        img.setAttribute('alt', 'Фотография жилья');
        img.setAttribute('src', item);
        div.appendChild(img);
        temptlatePhotos.appendChild(div);
      });
      advertising.querySelector('.popup__description').textContent = template.offer.description;
      return advertising;
    }
  };
})();
