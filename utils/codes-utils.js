const { generate } = require("generate-passphrase");

function generatePassphrase() {
  return generate({
    length: 3,
    separator: "-",
    titlecase: false,
    numbers: true,
  });
}

module.exports = generatePassphrase;
