const express = require('express')
const router = express.Router()
const withAuth = require('../../utils/auth')
const convertMarkdownToHTML = require('../../utils/markdown-utils')
const sanitiseHTML = require('../../utils/html-utils')

// create a GET route that has an input parameter some markdown string and returns sanitized html
router.get('/html', withAuth, async (req, res) => {
  try {
    const markdown = req.body.markdown
    let html = await convertMarkdownToHTML(markdown)
    html = sanitiseHTML(html)
    res.status(200).json({ html })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error converting markdown to html' })
  }
})

module.exports = router
