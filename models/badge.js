const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  teamLogo: {
    type: String
  },
  teamURL: {
    type: String
  }
});

const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge;
