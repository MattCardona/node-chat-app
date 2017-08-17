var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('H:mm a');
  var template = $('#messageTemplate').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('H:mm a');
  var template = $('#locationMessageTemplate').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })

  $('#messages').append(html);
});

$('#messageForm').on('submit', function (e) {
  e.preventDefault();
  var messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

var locationButton = $('#sendLocation');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to get location.');
  });
});
