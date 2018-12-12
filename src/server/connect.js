const mongoose = require('mongoose');

const devDbUrl = 'yourmongodburl';
const mongoDB = process.env.MONGODB_URI || devDbUrl;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => {
  console.log('MongoDB connection success');
});
