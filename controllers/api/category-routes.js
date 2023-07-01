const router = require("express").Router();
const Category = require("../../models/Category");
const { withAuth, withAdminAuth } = require("../../utils/auth");
const { getAllCategories } = require("../../utils/model-utils");

// Get all categories
router.get("/all", withAuth, async (req, res) => {
  try {
    const categories = await getAllCategories();

    if (!categories || categories.length === 0) {
      res.status(404).json({ message: "No categories found" });
      return;
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving categories");
  }
});

// Create a new category
router.post("/", withAdminAuth, async (req, res) => {
  const categoryData = req.body;
  // validate
  if (!categoryData.title || !categoryData.description) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const response = await Category.create(categoryData);
    if (!response) {
      res.status(404).json({ message: "Category not created" });
      return;
    }
    console.log(response);
    const newCategory = response.get({ plain: true });
    res.status(200).json(newCategory);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating category" });
  }
});

// Update a category
router.put("/:id", withAdminAuth, async (req, res) => {
  const categoryData = req.body;
  // validate
  if (!categoryData.title || !categoryData.description) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  if (!req.params.id) {
    res.status(400).json({ message: "Missing category id" });
    return;
  }
  if (Number.isNaN(parseInt(req.params.id))) {
    res.status(400).json({ message: "Category id is not a number" });
    return;
  }
  const categoryId = parseInt(req.params.id);

  try {
    const response = await Category.update(categoryData, {
      where: { id: categoryId },
    });
    if (!response) {
      res.status(404).json({ message: "Category not updated" });
      return;
    }
    // returns the id of the updated category

    res.status(200).json({ message: "Category updated" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating category" });
  }
});

// get a category by id
router.get("/:id", withAuth, async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Missing category id" });
    return;
  }
  if (Number.isNaN(parseInt(req.params.id))) {
    res.status(400).json({ message: "Category id is not a number" });
    return;
  }
  const categoryId = parseInt(req.params.id);
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    const categoryData = category.get({ plain: true });
    res.status(200).json(categoryData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving category" });
  }
});

// delete a category
router.delete("/:id", withAdminAuth, async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Missing category id" });
    return;
  }
  if (Number.isNaN(parseInt(req.params.id))) {
    res.status(400).json({ message: "Category id is not a number" });
    return;
  }
  const categoryId = parseInt(req.params.id);
  try {
    const response = await Category.destroy({
      where: { id: categoryId },
    });
    if (!response) {
      res.status(404).json({ message: "Category not deleted" });
      return;
    }
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting category" });
  }
});

module.exports = router;
