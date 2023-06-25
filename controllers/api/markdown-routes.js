const express = require("express");
const router = express.Router();
const { withAuth } = require("../../utils/auth");
const {
  convertMarkdownToHTML,
  addHTMLTags,
} = require("../../utils/markdown-utils");
const { sanitizeHTML } = require("../../utils/html-utils");

// create a GET route that has an input parameter some markdown string and returns sanitized html
router.post("/html", withAuth, async (req, res) => {
  try {
    const markdown = req.body.markdown;
    const addCustomHTMLTags = req.body.addHTMLTags;
    console.log("markdown-routes.js: markdown = ", markdown);
    let html = await convertMarkdownToHTML(markdown);
    console.log("markdown-routes.js: html = ", html);
    html = sanitizeHTML(html);
    if (addCustomHTMLTags) {
      html = await addHTMLTags(html);
      html = `<div class="markdown">${html}</div>`;
      console.log("markdown-routes.js: html with tags = ", html);
    }
    res.status(200).json({ html });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Error converting markdown to html" });
  }
});

module.exports = router;
