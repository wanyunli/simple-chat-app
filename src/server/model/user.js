const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  clientId: { type: String, required: false }
});

// UserSchema.set('toObject', {
//   transform(doc, ret) {
//     ret._id = mongoose.Types.ObjectId(ret.id);
//     delete ret.id;
//   }
// });

UserSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('User', UserSchema);
