const users = [];


//Unirse usuarios al chat
function userJoin (id, username, room) {
    const user = {id, username, room};

    users.push(user);

    return user;
};


//Obtener usuario actual
function getCurrentUser (id) {
    return users.find(user => user.id === id);
};


module.exports = {
    userJoin,
    getCurrentUser
}