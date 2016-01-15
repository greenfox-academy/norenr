'use strict';

var url = 'https://mysterious-dusk-8248.herokuapp.com/todos';

function getAllTodoItems(callback) {
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var items = JSON.parse(req.response);
      return callback(items);
    }
  };
}

function postItemToServer(text, callback) {
  var req = new XMLHttpRequest();
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({text: text}));
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var res = JSON.parse(req.response);
      return callback(res.id, res.text, res.completed);
    }
  };
}

function deleteItemFromServer(id, callback) {
  var req = new XMLHttpRequest();
  req.open('DELETE', url + '/' + id);
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var res = JSON.parse(req.response);
      return callback(res.id);
    }
  };
}

function updateItemOnServer(id, text, completed, callback) {
  var req = new XMLHttpRequest();
  req.open('PUT', url + '/' + id);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({'text': text, 'completed': completed}));
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var res = JSON.parse(req.response);
      return callback(res);
    }
  };
}
