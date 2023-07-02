const idField = document.getElementById("category");
const titleField = document.getElementById("categoryTitle");
const descriptionField = document.getElementById("categoryDescription");

// handle select event
idField.addEventListener("change", async (event) => {
  event.preventDefault();

  const categoryID = idField.value;
  if (categoryID) {
    await getCategory(categoryID);
  }
});

async function getCategory(id) {
  if (!id) {
    // eslint-disable-next-line no-undef
    alertModal("InfoPulse Alert", "Missing category id");
    return;
  }
  id = parseInt(id);
  if (id < 1) {
    // clear out title and description
    titleField.value = "";
    descriptionField.value = "";
    // hide update and delete buttons
    document.getElementById("updateCategory").classList.add("hidden");
    document.getElementById("deleteCategory").classList.add("hidden");
    // show create button
    document.getElementById("createCategory").classList.remove("hidden");
    return;
  } else {
    // show update and delete buttons
    document.getElementById("updateCategory").classList.remove("hidden");
    document.getElementById("deleteCategory").classList.remove("hidden");
    // hide create button
    document.getElementById("createCategory").classList.add("hidden");
  }
  try {
    const response = await fetch(`/api/categories/${id}`);
    if (!response.ok) {
      const responseJson = await response.json();
      // eslint-disable-next-line no-undef
      alertModal(
        "InfoPulse Alert",
        "Error getting category " + responseJson.message
      );
      return;
    }
    const category = await response.json();
    titleField.value = category.title;
    descriptionField.value = category.description;
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line no-undef
    alertModal("InfoPulse Alert", "Error getting category " + error);
  }
}

document
  .getElementById("createCategory")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    // Create a new category
    const categoryData = {
      title: titleField.value.trim(),
      description: descriptionField.value.trim(),
    };
    // validate
    if (!categoryData.title || !categoryData.description) {
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Missing required fields");
      return;
    }
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(categoryData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const responseJson = await response.json();
        // eslint-disable-next-line no-undef
        alertModal(
          "InfoPulse Alert",
          "Error creating category " + responseJson.message
        );
        return;
      }
      // refill the select list
      loadCategories();
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Error creating category " + error);
    }
  });

document
  .getElementById("updateCategory")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    // Update a category
    const categoryData = {
      title: titleField.value.trim(),
      description: descriptionField.value.trim(),
    };
    // validate
    if (!categoryData.title || !categoryData.description) {
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Missing required fields");
      return;
    }
    let id = idField.value;
    if (!id) {
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Missing category id");
      return;
    }
    id = parseInt(id);
    if (id < 1) {
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Invalid category id");
      return;
    }

    try {
      const response = await fetch("/api/categories/" + id, {
        method: "PUT",
        body: JSON.stringify(categoryData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const responseJson = await response.json();
        // eslint-disable-next-line no-undef
        alertModal(
          "InfoPulse Alert",
          "Error updating category " + responseJson.message
        );
        return;
      }
      const updatedCategory = await response.json();
      loadCategories();
      // eslint-disable-next-line no-undef
      alertModal(
        "InfoPulse Alert",
        "Category updated " + JSON.stringify(updatedCategory)
      );
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Error updating category " + error);
    }
  });

document
  .getElementById("deleteCategory")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    let categoryId = idField.value;
    // validate
    if (!categoryId) {
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Missing category id");
      return;
    }
    if (Number.isNaN(parseInt(categoryId))) {
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Category id is not a number");
      return;
    }
    categoryId = parseInt(categoryId);

    if (categoryId < 1) {
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Invalid category id");
      return;
    }
    // make sure there are no templates using this category
    try {
      const response = await fetch("/api/templates/category/" + categoryId, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const responseJson = await response.json();
        // eslint-disable-next-line no-undef
        alertModal(
          "InfoPulse Alert",
          "Error getting templates for the category" + responseJson.message
        );
        return;
      }
      const templates = await response.json();
      if (templates.length > 0) {
        let templateList = "";
        for (let i = 0; i < templates.length; i++) {
          templateList += templates[i].title + "\n";
        }
        // eslint-disable-next-line no-undef
        alertModal(
          "InfoPulse Alert",
          "You cannot delete this category as the following templates are using this category:\n" +
            templateList
        );
        return;
      }
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-undef
      alertModal(
        "InfoPulse Alert",
        "Error getting templates for the category" + error
      );
    }

    // confirm delete
    try {
      // eslint-disable-next-line no-undef
      const confirmation = await confirmModal(
        "Delete this category?",
        "Are you sure you want to delete this category?"
      );
      if (!confirmation) {
        return;
      }
    } catch (error) {
      console.error(error);
      return;
    }

    try {
      const response = await fetch("/api/categories/" + categoryId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const responseJson = await response.json();
        // eslint-disable-next-line no-undef
        alertModal(
          "InfoPulse Alert",
          "Error deleting category " + responseJson.message
        );
        return;
      }
      loadCategories();
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Category deleted");
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-undef
      alertModal("InfoPulse Alert", "Error deleting category " + error);
    }
  });

// reload the category select with all categories
async function loadCategories() {
  try {
    const response = await fetch("/api/categories/all", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const responseJson = await response.json();
      // eslint-disable-next-line no-undef
      alertModal(
        "InfoPulse Alert",
        "Error getting categories " + responseJson.message
      );
      return;
    }

    const categories = await response.json();
    idField.innerHTML = "";

    if (!categories || categories.length < 1) {
      return;
    }
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.title;
      idField.appendChild(option);
    }
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line no-undef
    alertModal("InfoPulse Alert", "Error getting categories " + error);
  }
}

// handle goBack button to return to admin dashboard
document.getElementById("goBack").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/admin";
});

// detect page load
window.addEventListener("load", async function () {
  // load the category data
  const categoryID = idField.value;
  if (categoryID) {
    await getCategory(categoryID);
  }
});
