const R = require('ramda');
const server = require('http').createServer();
const io = require('socket.io')(server);
let { userList, chatrooms, messageId } = require('./presetValues');

const isNotNil = R.complement(R.isNil);
function setClientIdForUser(clientId, userId) {
  userList = userList.map(item => (item.id === userId
    ? {
      ...item,
      clientId
    }
    : item));
}

function addClientIdForChatroom(clientId, chatroomId) {
  chatrooms = chatrooms.map((chatroom) => {
    if (chatroomId === chatroom.id) {
      const { ioClients } = chatroom;
      return {
        ...chatroom,
        ioClients: ioClients.concat([clientId])
      };
    }
    return chatroom;
  });
}

function getClientIdOfUser(userId) {
  const user = R.find(R.propEq('id', userId), userList);
  return R.prop('clientId', user);
}

function removeClientIdFormChatroom(clientId, chatroomId) {
  chatrooms = chatrooms.map((chatroom) => {
    if (chatroomId === chatroom.id) {
      const { ioClients } = chatroom;
      const updatedIoClients = ioClients.filter(item => item !== clientId);
      return {
        ...chatroom,
        ioClients: updatedIoClients
      };
    }
    return chatroom;
  });
}

function getAvailableUsers() {
  return userList
    .filter(item => item.clientId === null)
    .map(item => ({ id: item.id, name: item.name }));
}
function getChatrooms() {
  return chatrooms.map(item => ({ id: item.id, name: item.name }));
}

function handleSetUser(client, data) {
  setClientIdForUser(client.id, data.id);
}

function handleRefreshPage(client, data) {
  const { userId, chatroomId } = data;
  const oldClientId = getClientIdOfUser(userId);
  if (isNotNil(oldClientId)) {
    removeClientIdFormChatroom(oldClientId, chatroomId);
  }
  if (isNotNil(userId)) {
    setClientIdForUser(client.id, userId);
  }
  if (isNotNil(chatroomId)) {
    addClientIdForChatroom(client.id, chatroomId);
  }
}

function handleRemoveUser(userId) {
  userList = userList.map(item => (item.id === userId
    ? {
      ...item,
      clientId: null
    }
    : item));
}

function handleLeaveChatroom(clientId, chatroomId) {
  chatrooms = chatrooms.map((chatroom) => {
    if (chatroomId === chatroom.id) {
      const { ioClients } = chatroom;
      const updatedIoClients = ioClients.filter(item => item !== clientId);
      return {
        ...chatroom,
        ioClients: updatedIoClients
      };
    }
    return chatroom;
  });
}

io.on('connection', (client) => {
  client.on('disconnect', () => {});
  client.on('getAvailableUsers', () => {
    client.emit('availableUsers', getAvailableUsers());
  });
  client.on('setUser', (data) => {
    handleSetUser(client, data);
  });
  client.on('removeUser', (userId) => {
    handleRemoveUser(userId);
  });
  client.on('getChatrooms', () => {
    client.emit('chatrooms', getChatrooms());
  });
  client.on('joinChatroom', (data) => {
    addClientIdForChatroom(client.id, data.id);
  });
  client.on('leaveChatroom', (chatroomId) => {
    handleLeaveChatroom(client.id, chatroomId);
  });
  client.on('sendMessage', (data) => {
    const { chatroomId } = data;
    const chatroom = chatrooms.find(item => item.id === chatroomId);
    if (isNotNil(chatroom)) {
      chatroom.ioClients.forEach((item) => {
        io.to(item).emit('receiveMessage', { ...data, messageId });
      });
      messageId += 1;
    }
  });
  client.on('refreshPage', (data) => {
    handleRefreshPage(client, data);
  });
  client.on('error', (error) => {
    console.log(`Received error from client(${client.id}): `, error);
  });
});
server.listen(8080);
