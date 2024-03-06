const mongoose = require('mongoose');

const clubMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  isMember: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model('ClubMember', clubMemberSchema);
