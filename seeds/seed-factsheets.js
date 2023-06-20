const { Factsheet } = require('../models')

async function seedFactsheets () {
  // Assuming there's at least one administrator with id 1.
  const administratorId = 1
  const factsheets = [
    { userId: 1, templateId: 1, administratorId, customMarkdown: 'This is really important information', customHtml: '<p>This is really important information</p>', dateLastViewed: new Date() },
    { userId: 1, templateId: 2, administratorId, customMarkdown: 'Don\'t forget to wash your hands', customHtml: '<p>Don\'t forget to wash your hands</p>', dateLastViewed: new Date() },
    { userId: 2, templateId: 3, administratorId, customMarkdown: 'You need to come back to let me check your eyes in 3 months', customHtml: '<p>You need to come back to let me check your eyes in 3 months</p>', dateLastViewed: new Date() },
    { userId: 2, templateId: 4, administratorId, customMarkdown: 'All of this applies to you', customHtml: '<p>All of this applies to you</p>', dateLastViewed: new Date() },
    { userId: 3, templateId: 5, administratorId, customMarkdown: 'You are on the good end of this scale', customHtml: '<p>You are on the good end of this scale</p>', dateLastViewed: new Date() },
    { userId: 3, templateId: 6, administratorId, customMarkdown: 'Give this to your mother', customHtml: '<p>Give this to your mother</p>', dateLastViewed: new Date() }
  ]

  for (let i = 0; i < factsheets.length; i++) {
    try {
      await Factsheet.create(factsheets[i])
      console.log(`Factsheet ${i + 1} created.`)
    } catch (err) {
      console.error(`Factsheet ${i + 1} could not be created.`)
      console.error(err)
    }
  }

  console.log('Factsheet seeding completed.')
}

module.exports = seedFactsheets
