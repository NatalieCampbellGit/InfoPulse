const { Factsheet } = require('../models')

async function seedFactsheets () {
  // Assuming there's at least one administrator with id 1.
  const factsheets = [
    { user_id: 1, template_id: 1, administrator_id: 1, custom_markdown: 'This is really important information', custom_html: '', date_last_viewed: null },
    { user_id: 1, template_id: 2, administrator_id: 1, custom_markdown: 'Get outside for 2 hours per day when you can', custom_html: '', date_last_viewed: null },
    { user_id: 2, template_id: 3, administrator_id: 1, custom_markdown: 'You need to come back to let me check your eyes in 3 months', custom_html: '', date_last_viewed: null },
    { user_id: 2, template_id: 4, administrator_id: 1, custom_markdown: 'All of this applies to you', custom_html: '', date_last_viewed: null },
    { user_id: 3, template_id: 5, administrator_id: 1, custom_markdown: 'You are on the good end of this scale', custom_html: '', date_last_viewed: null },
    { user_id: 3, template_id: 6, administrator_id: 1, custom_markdown: 'Give this to your mother', custom_html: '', date_last_viewed: null },
    { user_id: 3, template_id: 7, administrator_id: 1, custom_markdown: 'Wear those safety specs!', custom_html: '', date_last_viewed: null },
    { user_id: 3, template_id: 8, administrator_id: 1, custom_markdown: 'Here is that info you wanted on kids\' eyes', custom_html: '', date_last_viewed: null },
    { user_id: 3, template_id: 9, administrator_id: 1, custom_markdown: 'You have a family history of this, so come back annually.', custom_html: '', date_last_viewed: null },
    { user_id: 3, template_id: 10, administrator_id: 1, custom_markdown: 'You asked me what an orthoptist is. I hope this helps!', custom_html: '', date_last_viewed: null },
    { user_id: 3, template_id: 11, administrator_id: 1, custom_markdown: 'I thought you might enjoy this!', custom_html: '', date_last_viewed: null },
    { user_id: 3, template_id: 12, administrator_id: 1, custom_markdown: 'You have nuclear cataracts, and they are developing quite slowly.', custom_html: '', date_last_viewed: null },
    { user_id: 3, template_id: 13, administrator_id: 1, custom_markdown: 'Please check your hb1ac regularly, and see me every 12 months', custom_html: '', date_last_viewed: null }
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
