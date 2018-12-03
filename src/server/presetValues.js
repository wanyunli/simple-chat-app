const userList = [
  {
    id: 1,
    name: 'Lily',
    clientId: null
  },
  {
    id: 2,
    name: 'Lucy',
    clientId: null
  },
  {
    id: 3,
    name: 'Poly',
    clientId: null
  }
];
const chatrooms = [
  {
    id: 1,
    name: 'Tranfer Chatroom',
    ioClients: []
  },
  {
    id: 2,
    name: 'Shopping Chatroom',
    ioClients: []
  },
  {
    id: 3,
    name: 'Traval in Finland Chatroom',
    ioClients: []
  },
  {
    id: 4,
    name: 'Traval in Europe Chatroom',
    ioClients: []
  }
];

const messageId = 0;

module.exports = {
  userList,
  chatrooms,
  messageId
};
