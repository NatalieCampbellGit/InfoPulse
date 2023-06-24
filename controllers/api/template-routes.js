const sequelize = require('sequelize')
const express = require('express')
const template = require('../../models/Template')
const withAuth = require('../../utils/auth')
const router = require('express').Router();
const Op = sequelize.op();

// route a for a search on the templates model using either an id or text search
router.get('/search', (res, req) => {
    
        const searchText = req.query.search;
        const id = req.query.type;
        // create a empty query object
        let query = {};

    
        if (id) {
          const category_id = parseInt(id);
          if (!isNaN(category_id)) {
            query = { category_id };
          }
        } if (searchText) {
          query = {
            text: {
              [sequelize.Op.like]: `%${searchText}%`
            }
          };
        } else if (id && searchText){
          const category_id = parseInt(id);
          if (!isNaN(category_id)) {
            query = { category_id,
              text: {
                [Op.like]: `%${searchText}%`
              }
            }
        }
      }
      
        // Query the model based on the search criteria
        template.findAll({ where: query })
          .then((results) => {
           
            res.status(200).json(results);
          })
          .catch((error) => {
            console.error('Error retrieving results', error);
            res.status(500).send('Error retrieving results');
          });
      });
