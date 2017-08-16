var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

describe('gererateMessage', () => {
  it('should generate correct message object', () => {
    var res = generateMessage('Ralph', 'Hello Guys');

    expect(res.from).toBeA('string').toBe('Ralph');
    expect(res.text).toBeA('string').toBe('Hello Guys');
    expect(res.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', (done) => {
    var latitude = 38.575764;
    var longitude = -121.478851;
    var res = generateLocationMessage('Ralph', latitude, longitude);

    expect(res.from).toBeA('string').toBe('Ralph');
    expect(res.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(res.createdAt).toBeA('number');
    done();
  });
});