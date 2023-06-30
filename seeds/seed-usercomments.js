const { UserComment } = require("../models");

async function seedUserComments() {
  const comments = [
    {
      factsheet_id: 1,
      content:
        "Catching problems early is key in so many aspects of health, and it's no different with our eyes. Regular eye examinations can catch issues before they become serious. I've always believed in prevention rather than cure.",
    },
    {
      factsheet_id: 2,
      content:
        "Eyesight is a precious gift, and it's our responsibility to care for it",
    },
    { factsheet_id: 3, content: "What do you call a fish without eyes? Fsh!" },
    {
      factsheet_id: 4,
      content:
        "Why don't eyes make good school teachers? They can't control their pupils!",
    },
    {
      factsheet_id: 5,
      content:
        "Why do we rarely fight with our eyes? Because they always see eye-to-eye!",
    },
    {
      factsheet_id: 6,
      content: "Why did the phone wear glasses? It lost all its contacts!",
    },
  ];

  for (let i = 0; i < comments.length; i++) {
    try {
      await UserComment.create(comments[i]);
      console.log(`UserComment ${i + 1} created.`);
    } catch (error) {
      console.error(`UserComment ${i + 1} could not be created.`);
      console.error(error);
    }
  }

  console.log("UserComment seeding completed.");
}

module.exports = seedUserComments;
