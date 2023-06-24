const express = require('express')
const router = express.Router()
const Template = require('../../models/Template')
const FactSheet = require('../../models/Factsheet')
const UserComment = require('../../models/UserComment')
const User = require('../../models/User')
const Administrator = require('../../models/Administrator')
const withAuth = require('../../utils/auth')

// const path = require('path')
router.get('/edit', withAuth, async (req, res) => {
  res.render('rm-test-edit-template')
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const id = req.params.id
    const factSheet = await FactSheet.findByPk(id, {
      include: [
        { model: Template },
        { model: UserComment },
        { model: User },
        { model: Administrator }]
    })

    if (!factSheet) {
      res.status(404).send('A fact sheet by that id was not found')
      return
    }

    const factSheetData = factSheet.get({ plain: true })
    // console.log(factSheetData)
    res.render('rm-fact-sheet', factSheetData)
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occurred while retrieving fact sheet')
  }
})

module.exports = router
