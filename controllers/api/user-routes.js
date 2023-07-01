// Purpose: user routes
const {sequelize, Op } = require("sequelize");
const User = require("../../models/User");
const Template = require("../../models/Template");
const Category = require("../../models/Category");
const { use } = require("../home-routes");
const { withAuth } = require("../../utils/auth");
const router = require("express").Router();
const { formatUserListItems } = require("../../utils/html-utils");
const session = require("express-session");
// CREATE new user: new users are created by administrators only
// must have:
// administrator_id
// first_name
// last_name
// date_of_birth
// email
// authentication_code
// mobile_phone (optional)
// crm_id (optional)
// the user will use the authentication_code to create their own username and password
router.post("/", async (req, res) => {
  // check that the user does not already exist
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
        // ! etcetera
      },
    });
    if (dbUserData) {
      // already exists. Let the user know
      res.status(400).json({ message: "This username is already taken." });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: "Error checking for existing user" });
  }
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
      // ! etcetera
    });
    // save session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userRole = "user";
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      // ! etcetera
      res.status(200).json(dbUserData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error creating new user" });
  }
});

// Login
// if it is the first time the user is logging in,
// they will use the authentication_code to create their own username and password
// the email address and the authentication_code identifies the user the first time
// the user will use the username and password to log in from then on
// so if the user has already created a username and password, then the authentication_code is unnecessary
router.post("/login", async (req, res) => {

  const email = req.body.username.toLowerCase().trim();
  const username = req.body.username.toLowerCase().trim();
  const password = req.body.password.trim();

  console.log(username, password);

  if(session.loggedIn){
    res.status(200).send({message: "User already logged in"})
    redirect("/user");
    return;
  }
  // validate username
  if(username == "" || username == null){
    res.status(404).send({message: "Invalid username"})
    return;
  };

  if(username.length > 50 || username.length < 1 ){
    res.status(404).send({message: "Invalid username"})
    return;
  };

  try {
    const userData = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
        // ! etcetera
      },
    });
    if (!userData) {
      console.log(userData);
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
        
      return;
    }
    const validPassword = await userData.checkPassword(password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }
   
    // save session
      req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.userRole = "user";
      // ! etcetera
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error logging in" });
  }
});

// handles the registration of new users
// uses the email the client has provided and the auth code to verify the user and redirect 
// to the sign up page
router.put("/register", async (req, res) => {

// ! may need to change the req.body for auth code. 
  const email = req.body.email;
  const authentication_code = req.body.authentication_code;
  const password = req.body.password
  const username = req.body.userName;

// !validate email, username and password and trim
  try {
    const userData = await User.findOne({
      where: {
        [Op.and]: [{ authentication_code }, { email }],
      
        // ! etcetera
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect details. Please try again!" });
      return;
    }
    const validateAuthCode = await userData.checkAuthenticationCode(authentication_code);
    if (!validateAuthCode) {
      res
        .status(400)
        .json({ message: "Error validating authorisation code or email" })
      return;

    } else if (validateAuthCode) {

        const updateUser = await User.update({
      
            where: {
              [Op.and]: [{ authentication_code }, { email }],
            },
            set: { username: username, password: password }
        })
      

        if(updateUser[0] === 0){
            res.status(400).json({message: "Error creating new user"})
            return;
        }

        if(updateUser[0] === 1){
              // save session
        console.log(userData)
        req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.userRole = "user";
        res.status(200).json({ message: "Successfully registered new user"})
        res.redirect('/')
      });
     }
    } 
    }catch (error) { 
      console.log(error);
      res.status(500).json({ error, message: "Error logging in" });
    }
   });



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
    
// ! import to export the router
module.exports = router;
