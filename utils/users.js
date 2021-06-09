const users = [];


//Unirse usuarios al chat
function userJoin (id, username, room) {
    const user = {id, username, room};

    users.push(user);

    return user;
};


//Obtener usuario actual
function getCurrentUser(id) {
    return users.find(user => user.id === id);
};


//Usuarios salgan del chat
function userLeave(id){
    const index = users.findIndex (user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}


//Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}