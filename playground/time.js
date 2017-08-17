const moment = require('moment');

var date = new Date();

var natural  = moment(date).format("MMM Do, YYYY");
console.log('naturalDate', natural);

var time = new Date().getTime();

var naturalTime  = moment(time).format('H:mm a');

console.log('naturalTime', naturalTime);