const {Users} = require('./users.js');
const expect = require('expect');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 5,
      name: 'Ralph',
      room: 'study'
    },{
      id: 4,
      name: 'Bobby',
      room: 'study'
    },{
      id: 3,
      name: 'Elvis',
      room: 'play'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var obj = {
      id: 54321,
      name: 'Ralph',
      room: 'study'
    }
    var me = users.addUser('54321', 'Ralph', 'study');

    expect(users.users).toEqual([me]);
  });

  it('should remove a user', () => {
    var remove = users.removeUser(3);
    expect(users.users).toEqual([{
      id: 5,
      name: 'Ralph',
      room: 'study'
    },{
      id: 4,
      name: 'Bobby',
      room: 'study'
    }]);
    expect(remove).toEqual({
      id: 3,
      name: 'Elvis',
      room: 'play'
    })
  });

  it('should not remove a user', () => {
    //pass in a invalid id
    //expect users.users has not changed
    var remove = users.removeUser(2);
    expect(users.users).toEqual([{
      id: 5,
      name: 'Ralph',
      room: 'study'
    },{
      id: 4,
      name: 'Bobby',
      room: 'study'
    },{
      id: 3,
      name: 'Elvis',
      room: 'play'
    }]);
  });

  it('should find user', () => {
    var me = users.getUser(5);

    expect(me).toEqual({
      id: 5,
      name: 'Ralph',
      room: 'study'
    });
  });

  it('should not find user', () => {
    var me = users.getUser(6);

    expect(me).toEqual(undefined);
  });

  it('should return names in study room', () => {
    var list  = users.getUserList('study');

    expect(list).toEqual(['Ralph', 'Bobby']);
  });

    it('should return names in play room', () => {
    var list  = users.getUserList('play');

    expect(list).toEqual(['Elvis']);
  });
})