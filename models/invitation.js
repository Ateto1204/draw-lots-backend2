const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  junior: { type: String, required: true },
  senior: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, default: Date.now, expires: 60 }
});

const Invitation = mongoose.model('invitation', invitationSchema);

module.exports = Invitation;