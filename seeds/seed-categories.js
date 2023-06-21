const { Category } = require('../models')

async function seedCategories () {
  const categories = [
    { title: 'Eye Diseases', description: 'Understanding various eye diseases and their treatments' },
    { title: 'Vision Correction', description: 'Insights into refractive errors and their correction' },
    { title: 'Eye Health & Safety', description: 'Preventative measures and safety tips for maintaining eye health' },
    { title: 'Child Eye Care', description: 'Information on eye conditions and care specifically for children' },
    { title: 'Age-Related Eye Conditions', description: 'Insight into conditions affecting the eye due to age' },
    { title: 'Optometry and Optical Devices', description: 'Information on optical devices and the field of optometry' },
    { title: 'General Eye Knowledge', description: 'General knowledge about eyes and vision' }
  ]

  for (let i = 0; i < categories.length; i++) {
    try {
      await Category.create(categories[i])
      console.log(`Category ${i + 1} created.`)
    } catch (err) {
      console.error(`Category ${i + 1} could not be created.`)
      console.error(err)
    }
  }

  console.log('Category seeding completed.')
}

module.exports = seedCategories
