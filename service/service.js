const Invitation = require('../models/invitation');
const crypto = require('crypto');

function generateCode() {
  return crypto.randomInt(10000, 99999).toString();
}

async function generate(junior, senior) {
    let code;

    while (true) {
        code = generateCode();
        const existing = await Invitation.findOne({ code });
        if (!existing) break;
    }

    const invitation = new Invitation({
        junior,
        senior,
        code,
    });

    await invitation.save();
    return code;
}

async function verify(code) {
    const invitation = await Invitation.findOne({ code });
    if (invitation) {
        return {
            junior: invitation.junior,
            senior: invitation.senior,
        };
    }
    return null;
}

module.exports = { generate, verify };