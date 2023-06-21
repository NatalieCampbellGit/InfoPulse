const express = require('express')
const router = express.Router()
const TemplateImage = require('../../models/TemplateImage')
const multer = require('multer')
const upload = multer()
const withAuth = require('../../utils/auth')
const path = require('path')

router.get('/', withAuth, async (req, res) => {
  try {
    const templateImages = await TemplateImage.findAll({
      attributes: ['id', 'title']
    })
    res.json(templateImages)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error getting template images' })
  }
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const id = req.params.id
    const image = await TemplateImage.findByPk(id)

    if (!image) {
      res.status(404).send('An image by that id was not found')
      return
    }

    if (!image.image_data || image.image_data.length === 0) {
      res.status(404).send('Image data not found')
      return
    }

    const extension = path.extname(image.filename).slice(1).toLowerCase() // remove the dot
    res.contentType(`image/${extension}`)
    res.status(200).send(image.image_data)
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occurred while retrieving image')
  }
})

router.post('/', withAuth, upload.single('image'), async function (req, res) {
  try {
    const image = req.file.buffer // req.file.buffer contains the image data
    const title = req.body.title
    const description = req.body.description
    const filename = req.file.originalname // req.file.originalname contains the original filename

    const newImage = await TemplateImage.create({
      image_data: image,
      title,
      description,
      filename
    })
    if (newImage) {
      const savedImage = newImage.get({ plain: true })
      console.log(savedImage)
      res.status(200).json({ message: 'Image uploaded and stored into database!', id: savedImage.id })
    } else {
      console.log('An error occurred while uploading image')
      res.status(500).json({ message: 'An error occurred while saving the image' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error, message: 'An error occurred while uploading the image' })
  }
})

module.exports = router
