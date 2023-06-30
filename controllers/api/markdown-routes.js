const router = require("express").Router();
const { withAuth } = require("../../utils/auth");
const {
  convertMarkdownToHTML,
  addHTMLTags,
} = require("../../utils/markdown-utils");
const { sanitizeHTML } = require("../../utils/html-utils");

// input parameter some markdown string and returns sanitized html with optionally inline CSS tags
router.post("/html", withAuth, async (req, res) => {
  try {
    const markdown = req.body.markdown;
    const addCustomHTMLTags = req.body.addHTMLTags;

    let html = await convertMarkdownToHTML(markdown);
    html = sanitizeHTML(html);
    if (addCustomHTMLTags) {
      html = await addHTMLTags(html);
      html = `<div class="markdown">${html}</div>`;
    }
    res.status(200).json({ html });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: "Error converting markdown to html" });
  }
});

module.exports = router;
