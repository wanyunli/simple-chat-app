const User = require('../model/user');
const ObjectID = require('mongodb').ObjectID;

const { userList } = require('../presetValues');

function addInitialUser() {
  User.insertMany(userList, (error, docs) => {
    if (error) {
      console.log('Insert inital user error: ', error);
      return;
    }
    console.log('insert manay success: ', docs);
  });
}

function updateClientId(userId, clientId) {
  const query = { _id: new ObjectID(userId) };
  const updateOption = { clientId };
  User.updateOne(query, updateOption, (err, res) => {
    if (err) {
      console.log('update user error:', err);
      return;
    }
    console.log('update response is: ', res);
  });
}

async function findAailableUsers() {
  const query = { clientId: null };
  let result = [];
  await User.find(query, 'id, name', (error, docs) => {
    if (error) {
      console.log('findAvailableUsers error:', error);
    }
    result = docs;
  });
  return result;
}

module.exports = {
  addInitialUser,
  updateClientId,
  findAailableUsers
};
