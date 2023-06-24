/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const sequelize = require('sequelize')
const express = require('express')
const Template = require('../../models/Template')
const FactSheet = require('../../models/Factsheet')
const UserComment = require('../../models/UserComment')
const User = require('../../models/User')
const Administrator = require('../../models/Administrator')
const withAuth = require('../../utils/auth')
const { template } = require('handlebars')
const router = require('express').Router();

// route a for a search on the templates model using either an id or text search
router.get('/search', (res, req) => {
    
        const searchText = req.query.search;
        const searchTemplateID = req.query.type;
        // create a empty query object
        let query = {};

    
        if (searchTemplateID === 'id') {
          const id = parseInt(searchText);
          if (!isNaN(id)) {
            query = { id };
          }
        } else if (searchText === 'text') {
          query = {
            text: {
              [sequelize.Op.like]: `%${searchText}%`
            }
          };
        }
      
        // Query the model based on the search criteria
        template.findAll({ where: query })
          .then((results) => {
            // Handle the retrieved results and send a response
            res.send(results);
          })
          .catch((error) => {
            console.error('Error retrieving results', error);
            res.status(500).send('Error retrieving results');
          });
      });
