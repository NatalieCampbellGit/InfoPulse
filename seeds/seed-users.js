const { User } = require('../models')

async function seedUsers () {
  const users = [
    {
      administratorId: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-06-20',
      email: 'john.doe@example.com',
      mobilePhone: '12345678901',
      crmId: 'crm1234',
      passCode: 'pass1234',
      username: 'john.doe',
      password: 'johnspassword'
    },
    {
      administratorId: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1991-07-21',
      email: 'jane.smith@example.com',
      mobilePhone: '12345678902',
      crmId: 'crm1235',
      passCode: 'pass1235',
      username: 'jane.smith',
      password: 'janespassword'
    },
    {
      administratorId: 1,
      firstName: 'Tom',
      lastName: 'Johnson',
      dateOfBirth: '1992-08-22',
      email: 'tom.johnson@example.com',
      mobilePhone: '12345678903',
      crmId: 'crm1236',
      passCode: 'pass1236',
      username: 'tom.johnson',
      password: 'tomspassword'
    },
    {
      administratorId: 1,
      firstName: 'Amy',
      lastName: 'Brown',
      dateOfBirth: '1993-09-23',
      email: 'amy.brown@example.com',
      mobilePhone: '12345678904',
      crmId: 'crm1237',
      passCode: 'pass1237',
      username: 'amy.brown',
      password: 'amyspassword'
    },
    {
      administratorId: 1,
      firstName: 'Bill',
      lastName: 'Davis',
      dateOfBirth: '1994-10-24',
      email: 'bill.davis@example.com',
      mobilePhone: '12345678905',
      crmId: 'crm1238',
      passCode: 'pass1238',
      username: 'bill.davis',
      password: 'billspassword'
    },
    {
      administratorId: 1,
      firstName: 'Emma',
      lastName: 'Garcia',
      dateOfBirth: '1995-11-25',
      email: 'emma.garcia@example.com',
      mobilePhone: '12345678906',
      crmId: 'crm1239',
      passCode: 'pass1239',
      username: 'emma.garcia',
      password: 'emmaspassword'
    },
    {
      administratorId: 1,
      firstName: 'Charlie',
      lastName: 'Miller',
      dateOfBirth: '1996-12-26',
      email: 'charlie.miller@example.com',
      mobilePhone: '12345678907',
      crmId: 'crm1240',
      passCode: 'pass1240',
      username: 'charlie.miller',
      password: 'charliespassword'
    },
    {
      administratorId: 1,
      firstName: 'Sophia',
      lastName: 'Wilson',
      dateOfBirth: '1997-01-27',
      email: 'sophia.wilson@example.com',
      mobilePhone: '12345678908',
      crmId: 'crm1241',
      passCode: 'pass1241',
      username: 'sophia.wilson',
      password: 'sophiaspassword'
    },
    {
      administratorId: 1,
      firstName: 'Daniel',
      lastName: 'Moore',
      dateOfBirth: '1998-02-28',
      email: 'daniel.moore@example.com',
      mobilePhone: '12345678909',
      crmId: 'crm1242',
      passCode: 'pass1242',
      username: 'daniel.moore',
      password: 'danielspassword'
    },
    {
      administratorId: 1,
      firstName: 'Olivia',
      lastName: 'Taylor',
      dateOfBirth: '1999-03-29',
      email: 'olivia.taylor@example.com',
      mobilePhone: '12345678910',
      crmId: 'crm1243',
      passCode: 'pass1243',
      username: 'olivia.taylor',
      password: 'oliviaspassword'
    }
  ]

  for (let i = 0; i < users.length; i++) {
    try {
      await User.create(users[i])
      console.log(`User ${i + 1} created.`)
    } catch (err) {
      console.error(`User ${i + 1} could not be created.`)
      console.error(err)
    }
  }

  console.log('User seeding completed.')
}

module.exports = seedUsers
