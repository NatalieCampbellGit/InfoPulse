const { generate } = require('generate-passphrase')

function generatePassphrase () {
  return generate({ length: 4, separator: '-', titlecase: false, numbers: true })
}

module.exports = generatePassphrase
