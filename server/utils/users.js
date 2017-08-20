class Users {
  constructor(){
    this.users = [];
  }
  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var removedUser;
    this.users = this.users.filter((user) => {
      if(user.id !== id){
        return user
      }else{
        removedUser = user;
      }
    });
    return removedUser;
  }
  getUser(id) {
    var user = this.users.filter((user) => {
      return user.id === id;
    });
    return user[0];
  }
  getUserList(room) {
    var inRoom = this.users.filter((user) => {
      return user.room === room;
    });
    var namesInRoom = inRoom.map((user) => {
      return user.name;
    });

    return namesInRoom;
  }
}

module.exports = {Users};