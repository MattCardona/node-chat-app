var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#messageForm').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function (data) {
    console.log('Data from messageForm callback', data);
  });
});

var locationButton = $('#sendLocation');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to get location.');
  });
});
