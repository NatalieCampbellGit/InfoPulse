const { User } = require("../models");

async function seedUsers() {
  const users = [
    {
      administrator_id: 1,
      first_name: "John",
      last_name: "Doe",
      date_of_birth: "1990-06-20",
      email: "john.doe@example.com",
      mobile_phone: "12345678901",
      crm_id: "crm1234",
      authentication_code: "pass1234",
      username: "john.doe",
      password: "johnspassword",
    },
    {
      administrator_id: 1,
      first_name: "Jane",
      last_name: "Smith",
      date_of_birth: "1991-07-21",
      email: "jane.smith@example.com",
      mobile_phone: "12345678902",
      crm_id: "crm1235",
      authentication_code: "pass1235",
      username: "jane.smith",
      password: "janespassword",
    },
    {
      administrator_id: 1,
      first_name: "Tom",
      last_name: "Johnson",
      date_of_birth: "1992-08-22",
      email: "tom.johnson@example.com",
      mobile_phone: "12345678903",
      crm_id: "crm1236",
      authentication_code: "pass1236",
      username: "tom.johnson",
      password: "tomspassword",
    },
    {
      administrator_id: 1,
      first_name: "Amy",
      last_name: "Brown",
      date_of_birth: "1993-09-23",
      email: "amy.brown@example.com",
      mobile_phone: "12345678904",
      crm_id: "crm1237",
      authentication_code: "pass1237",
      username: "amy.brown",
      password: "amyspassword",
    },
    {
      administrator_id: 1,
      first_name: "Bill",
      last_name: "Davis",
      date_of_birth: "1994-10-24",
      email: "bill.davis@example.com",
      mobile_phone: "12345678905",
      crm_id: "crm1238",
      authentication_code: "pass1238",
      username: "bill.davis",
      password: "billspassword",
    },
    {
      administrator_id: 1,
      first_name: "Emma",
      last_name: "Garcia",
      date_of_birth: "1995-11-25",
      email: "emma.garcia@example.com",
      mobile_phone: "12345678906",
      crm_id: "crm1239",
      authentication_code: "pass1239",
      username: "emma.garcia",
      password: "emmaspassword",
    },
    {
      administrator_id: 1,
      first_name: "Charlie",
      last_name: "Miller",
      date_of_birth: "1996-12-26",
      email: "charlie.miller@example.com",
      mobile_phone: "12345678907",
      crm_id: "crm1240",
      authentication_code: "pass1240",
      username: "charlie.miller",
      password: "charliespassword",
    },
    {
      administrator_id: 1,
      first_name: "Sophia",
      last_name: "Wilson",
      date_of_birth: "1997-01-27",
      email: "sophia.wilson@example.com",
      mobile_phone: "12345678908",
      crm_id: "crm1241",
      authentication_code: "pass1241",
      username: "sophia.wilson",
      password: "sophiaspassword",
    },
    {
      administrator_id: 1,
      first_name: "Daniel",
      last_name: "Moore",
      date_of_birth: "1998-02-28",
      email: "daniel.moore@example.com",
      mobile_phone: "12345678909",
      crm_id: "crm1242",
      authentication_code: "pass1242",
      username: "daniel.moore",
      password: "danielspassword",
    },
    {
      administrator_id: 1,
      first_name: "Olivia",
      last_name: "Taylor",
      date_of_birth: "1999-03-29",
      email: "olivia.taylor@example.com",
      mobile_phone: "12345678910",
      crm_id: "crm1243",
      authentication_code: "pass1243",
      username: "olivia.taylor",
      password: "oliviaspassword",
    },
  ];

  for (let i = 0; i < users.length; i++) {
    try {
      await User.create(users[i]);
      console.log(`User ${i + 1} created.`);
    } catch (err) {
      console.error(`User ${i + 1} could not be created.`);
      console.error(err);
    }
  }

  console.log("User seeding completed.");
}

module.exports = seedUsers;
