'use strict';

(function () {
  window.backend = {
    onErrorButton: function () {
      var newDiv = document.querySelector('.error');
      document.body.removeChild(newDiv);
    },
    errorHandler: function (status) {
      var div = document.querySelector('#error').content.cloneNode(true);
      var errorMessage = div.querySelector('p');
      switch (status) {
        case 400: errorMessage.textContent = 'Неверно задан адрес сервера!\nВы в этом не виноваты, но отправить объявление не получиться:('; break;
        case 404: errorMessage.textContent = 'Нет такой страницы'; break;
        case 500: errorMessage.textContent = 'Нужно настроить backend'; break;
      }
      document.body.appendChild(div);
      document.body.addEventListener('click', window.backend.onErrorButton, true);
    },
    load: function (onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          onError(xhr.status);
        } else {
          onLoad(xhr.response);
        }
      });
      xhr.addEventListener('timeout', function () {
        var errorDiv = document.querySelector('.error');
        var message = errorDiv.querySelector('.error__message');
        message.textContent = 'Время загрузки слишком большое!';
        document.body.appendChild(errorDiv);
        document.body.addEventListener('click', window.backend.onErrorButton, true);
      });
      xhr.addEventListener('error', function () {
        var errorDiv = document.querySelector('.error');
        var message = errorDiv.querySelector('.error__message');
        message.textContent = 'Произошла ошибка соединения!';
        document.body.appendChild(errorDiv);
        document.body.addEventListener('click', window.backend.onErrorButton, true);
      });
      xhr.responseType = 'json';
      xhr.open('GET', url);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          onError(xhr.status);
          onLoad();
        } else {
          onload();
        }
      });
      xhr.addEventListener('timeout', function () {
        var errorDiv = document.querySelector('.error');
        var message = errorDiv.querySelector('.error__message');
        message.textContent = 'Время загрузки слишком большое!';
        document.body.appendChild(errorDiv);
        document.body.addEventListener('click', window.backend.onErrorButton, true);
      });
      xhr.addEventListener('error', function () {
        var errorDiv = document.querySelector('.error');
        var message = errorDiv.querySelector('.error__message');
        message.textContent = 'Произошла ошибка соединения!';
        document.body.appendChild(errorDiv);
        document.body.addEventListener('click', window.backend.onErrorButton, true);
      });
      xhr.responseType = 'json';
      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
