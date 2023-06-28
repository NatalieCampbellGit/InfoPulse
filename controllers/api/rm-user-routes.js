const { Op } = require("sequelize");
const User = require("../../models/User");
const { withAuth } = require("../../utils/auth");
const router = require("express").Router();
const { formatUserListItems } = require("../../utils/html-utils");

// route a for a search on the users model using either an id or text search
router.post("/search", withAuth, async (req, res) => {
  console.log(req.body);
  let { id, searchTerm, returnFormat } = req.body;

  // validate the search criteria
  let idIsValid = false;
  let searchTermIsValid = false;

  if (id) {
    if (!isNaN(id)) {
      id = parseInt(id);
      if (id > 0) {
        idIsValid = true;
      }
    }
  }

  if (searchTerm) {
    if (typeof searchTerm === "string") {
      // add a minimum length for the search text
      if (searchTerm.length > 2) {
        searchTermIsValid = true;
      }
    }
  }

  // create a empty query object
  let query = {};
  if (!searchTermIsValid && !idIsValid) {
    // if neither search criteria is valid, return all users
  } else if (idIsValid && searchTermIsValid) {
    query = {
      [Op.and]: [
        { id },
        {
          [Op.or]: [
            { first_name: { [Op.like]: `%${searchTerm}%` } },
            { last_name: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
      ],
    };
  } else if (searchTermIsValid) {
    query = {
      [Op.or]: [
        { first_name: { [Op.like]: `%${searchTerm}%` } },
        { last_name: { [Op.like]: `%${searchTerm}%` } },
      ],
    };
  } else if (idIsValid) {
    query = {
      id,
    };
  }

  // Query the model based on the search criteria
  try {
    const userData = await User.findAll({
      where: query,
      order: [
        ["last_name", "ASC"],
        ["first_name", "ASC"],
      ],
    });
    if (!userData || userData.length === 0) {
      switch (returnFormat) {
        case "html":
          res
            .status(200)
            .send('<p class="text-pulse-green-500">No users were found</p>');
          break;
        default:
          res.status(404).json({ message: "No users were found" });
      }
      return;
    }
    // return the data
    const users = userData.map((image) => image.get({ plain: true }));
    switch (returnFormat) {
      case "html": {
        // use handlebars to render the data
        const htmlFormat = formatUserListItems(users);
        res.status(200).send(htmlFormat);
        break;
      }
      default:
        res.status(200).json(users);
    }
  } catch (error) {
    console.error("Error retrieving user search results", error);
    res.status(500).send("Error retrieving user search results");
  }
});

module.exports = router;
