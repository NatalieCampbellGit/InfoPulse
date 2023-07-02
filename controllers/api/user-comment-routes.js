const router = require("express").Router();
const UserComment = require("../../models/UserComment");
const { withAuth, withUserAuth } = require("../../utils/auth");

// Create a new userComment
router.post("/", withUserAuth, async (req, res) => {
  const userCommentData = req.body;
  // validate
  if (!userCommentData.content || !userCommentData.factsheet_id) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const response = await UserComment.create(userCommentData);
    if (!response) {
      res.status(404).json({ message: "User Comment not created" });
      return;
    }

    const newUserComment = response.get({ plain: true });
    res.status(200).json(newUserComment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating user comment" });
  }
});

// Update a userComment
router.put("/:id", withUserAuth, async (req, res) => {
  const userCommentData = req.body;
  // validate
  if (!userCommentData.content || !userCommentData.factsheet_id) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  if (!req.params.id) {
    res.status(400).json({ message: "Missing userComment id" });
    return;
  }
  if (Number.isNaN(parseInt(req.params.id))) {
    res.status(400).json({ message: "User comment id is not a number" });
    return;
  }
  const userCommentId = parseInt(req.params.id);

  let factsheet_id = userCommentData.factsheet_id;
  if (Number.isNaN(parseInt(factsheet_id))) {
    res.status(400).json({ message: "factsheet_id is not a number" });
    return;
  }
  factsheet_id = parseInt(factsheet_id);

  try {
    const response = await UserComment.update(
      {
        content: userCommentData.content,
        factsheet_id,
      },
      {
        where: { id: userCommentId },
        individualHooks: true,
      }
    );
    if (!response) {
      res.status(404).json({ message: "User comment not updated" });
      return;
    }
    if (response[0] === 0) {
      res.status(404).json({ message: "User comment not found" });
      return;
    }

    // returns the id of the updated userComment

    res.status(200).json({ message: "User comment updated" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating userComment" });
  }
});

// get a userComment by id
router.get("/:id", withAuth, async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Missing user comment id" });
    return;
  }
  if (Number.isNaN(parseInt(req.params.id))) {
    res.status(400).json({ message: "User comment id is not a number" });
    return;
  }
  const userCommentId = parseInt(req.params.id);
  try {
    const userComment = await UserComment.findByPk(userCommentId);
    if (!userComment) {
      res.status(404).json({ message: "User comment not found" });
      return;
    }
    const userCommentData = userComment.get({ plain: true });
    res.status(200).json(userCommentData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving userComment" });
  }
});

// delete a userComment
router.delete("/:id", withUserAuth, async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Missing userComment id" });
    return;
  }
  if (Number.isNaN(parseInt(req.params.id))) {
    res.status(400).json({ message: "User comment id is not a number" });
    return;
  }
  const userCommentId = parseInt(req.params.id);
  try {
    const response = await UserComment.destroy({
      where: { id: userCommentId },
    });
    if (!response) {
      res.status(404).json({ message: "User comment not deleted" });
      return;
    }
    res.status(200).json({ message: "User comment deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting userComment" });
  }
});

module.exports = router;
