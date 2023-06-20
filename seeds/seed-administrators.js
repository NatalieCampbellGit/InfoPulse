const { Administrator } = require('../models')

async function seedAdministrators () {
  const admin = {
    first_name: 'Jack',
    last_name: 'Kelly',
    email: 'jack.kelly@example.com',
    pass_code: 'pass1234',
    username: 'jack.kelly',
    password: 'jackspassword',
    permissions: 1 // 1 = super admin, 2 = admin, 3 = user
  }

  try {
    console.log('Creating administrator... ' + JSON.stringify(admin))
    await Administrator.create(admin)
    console.log('Administrator created.')
  } catch (err) {
    console.error('Administrator could not be created.')
    console.error(err)
  }
}

module.exports = seedAdministrators
