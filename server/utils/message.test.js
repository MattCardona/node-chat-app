var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('gererateMessage', () => {
  it('should generate correct message object', () => {
    var res = generateMessage('Ralph', 'Hello Guys');

    expect(res.from).toBeA('string').toBe('Ralph');
    expect(res.text).toBeA('string').toBe('Hello Guys');
    expect(res.createdAt).toBeA('number');
  });
});