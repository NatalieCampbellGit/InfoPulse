const { Template } = require('../models')

async function seedTemplates () {
  const administratorId = 1 // should be 1, as the first administrator created will have an id of 1

  const templates = [
    { title: 'Understanding Glaucoma', description: 'Overview of Glaucoma', categoryId: 1, markdown: 'Glaucoma content in markdown', html: '<p>Glaucoma content in html</p>', administratorId },
    { title: 'Understanding Refractive Errors', description: 'Overview of Refractive Errors', categoryId: 2, markdown: 'Refractive errors content in markdown', html: '<p>Refractive errors content in html</p>', administratorId },
    { title: 'Eye Injury Prevention', description: 'Overview of Eye Injury Prevention', categoryId: 3, markdown: 'Eye injury prevention content in markdown', html: '<p>Eye injury prevention content in html</p>', administratorId },
    { title: 'Common Vision Problems in Children', description: 'Overview of Vision Problems in Children', categoryId: 4, markdown: 'Vision problems in children content in markdown', html: '<p>Vision problems in children content in html</p>', administratorId },
    { title: 'Understanding Age-Related Macular Degeneration', description: 'Overview of AMD', categoryId: 5, markdown: 'AMD content in markdown', html: '<p>AMD content in html</p>', administratorId },
    { title: 'Understanding Eyeglass Prescriptions', description: 'Overview of Eyeglass Prescriptions', categoryId: 6, markdown: 'Eyeglass prescriptions content in markdown', html: '<p>Eyeglass prescriptions content in html</p>', administratorId },
    { title: 'Understanding the Eye and Vision', description: 'Overview of the Eye and Vision', categoryId: 7, markdown: 'Eye and vision content in markdown', html: '<p>Eye and vision content in html</p>', administratorId }
  ]

  for (let i = 0; i < templates.length; i++) {
    try {
      await Template.create(templates[i])
      console.log(`Template ${i + 1} created.`)
    } catch (err) {
      console.error(`Template ${i + 1} could not be created.`)
      console.error(err)
    }
  }

  console.log('Template seeding completed.')
}

module.exports = seedTemplates
