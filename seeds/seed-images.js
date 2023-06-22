const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const TemplateImage = require('../models/TemplateImage')

async function seedImages () {
  const images = [
    {
      title: 'Glaucoma',
      description: 'Normal eye and eye with glaucoma',
      filename: 'glaucoma.png'
    },
    {
      title: 'Myopia',
      description: 'Myopic eye and myopic eye with lens',
      filename: 'myopia.png'
    },
    {
      title: 'Hyperopia',
      description: 'Normal eye and eye with hyperopia',
      filename: 'hyperopia.jpg'
    },
    {
      title: 'Astigmatism',
      description: 'Normal eye and eye with astigmatism',
      filename: 'astigmatism.jpg'
    },
    {
      title: 'Presbyopia',
      description: 'Presbyopic eye with book, clear and blurry',
      filename: 'presbyopia.jpg'
    },
    {
      title: 'Dry Eye Banner',
      description: 'artistic eye with dry cracks',
      filename: 'dryeye-banner.jpg'
    },
    {
      title: 'Tear Film',
      description: 'Tear film layers',
      filename: 'tear-layers.jpg'
    },
    {
      title: 'Safety Glasses',
      description: 'Safety glasses',
      filename: 'safety-glasses.jpg'
    },
    {
      title: 'Vision Therapy',
      description: 'Girl with red-green glasses',
      filename: 'vision-therapy.jpg'
    },
    {
      title: 'Macular Degeneration',
      description: 'Normal eye and eyes with macular degeneration',
      filename: 'macular-degeneration.jpg'
    },
    {
      title: 'Optometrist',
      description: 'Optometrist with eye chart and trial frame',
      filename: 'optometrist.jpg'
    },
    {
      title: 'Optical Illusion',
      description: 'Optical illusion where straight lines look curved',
      filename: 'optical-illusion.jpg'
    },
    {
      title: 'Blue Eye',
      description: 'Blue eye',
      filename: 'blue-eye.jpg'
    }
  ]

  const dirPath = path.join(__dirname, '../seeds/images')
  console.log(dirPath)

  // Loop through the images array
  for (let i = 0; i < images.length; i++) {
    // Get the file name from the images array
    const file = images[i].filename
    if (!file) {
      console.error('No file name found.')
      continue
    }

    console.log(file)
    // Get the file path
    const filePath = path.join(dirPath, file)
    console.log(filePath)

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      try {
        // If the file exists, get the metadata using the sharp library
        const { width, height } = await sharp(filePath).metadata()

        // add it to the images array
        images[i].width = width
        images[i].height = height

        // Save to the database
        await seedWithImage(images[i], dirPath)
      } catch (err) {
        console.error('Could not read the image file.', err)
      }
    } else {
      console.error(`File ${file} does not exist.`)
    }
  }

  console.log('Image seeding completed.')
}

async function seedWithImage (fileDetails, dirPath) {
  try {
    try {
      // scale image down to 800px wide if bigger than this
      let image = fs.readFileSync(path.join(dirPath, fileDetails.filename))

      if (fileDetails.width > 800) {
        try {
          const scaledImage = await sharp(image).resize(800).toBuffer()
          image = scaledImage
          const metaData = await sharp(image).metadata()
          fileDetails.width = metaData.width
          fileDetails.height = metaData.height
        } catch (error) {
          console.log('Couldn\'t rescale the image' + error.message)
        }
      }
      await TemplateImage.create({
        title: fileDetails.title,
        description: fileDetails.description,
        filename: fileDetails.filename,
        width: fileDetails.width,
        height: fileDetails.height,
        image_data: image
      })

      console.log(`Image ${fileDetails.filename} has been saved to the database.`)
    } catch (err) {
      console.error('Could not save the image to the database.', err)
    }
  } catch (err) {
    console.error('Could not read the image file.', err)
  }
}

module.exports = seedImages
