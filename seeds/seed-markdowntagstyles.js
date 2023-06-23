const MarkdownTagStyle = require("../models/MarkdownTagStyle");

async function seedMarkdownTagStyles() {
  const styles = [
    {
      tag: "<h1>",
      style: "color: #31557F; margin-bottom: 20px; font-size: 2.5em;",
    },
    {
      tag: "<h2>",
      style: "color: #31557F; margin-bottom: 20px; font-size: 2em;",
    },
    {
      tag: "<h3>",
      style: "color: #5e86a6; margin-bottom: 20px; font-size: 1.75em;",
    },
    {
      tag: "<h4>",
      style: "color: #5e86a6; margin-bottom: 20px; font-size: 1.5em;",
    },
    {
      tag: "<h5>",
      style: "color: #9bbacc; margin-bottom: 20px; font-size: 1.25em;",
    },
    {
      tag: "<h6>",
      style: "color: #9bbacc; margin-bottom: 20px; font-size: 1em;",
    },
    { tag: "<p>", style: "color: #333333; font-size: 1em; line-height: 1.6;" },
    { tag: "<blockquote>", style: "font-size: 1em; font-weight: normal;" },
    { tag: "<strong>", style: "font-weight: bold;" },
    { tag: "<em>", style: "font-style: italic;" },
    { tag: "<u>", style: "text-decoration: underline;" },
    { tag: "<s>", style: "text-decoration: line-through;" },
    { tag: "<code>", style: "font-family: monospace;" },
    { tag: "<pre>", style: "font-family: monospace;" },
    { tag: "<ul>", style: "list-style-type: disc;" },
    { tag: "<ol>", style: "list-style-type: decimal;" },
    { tag: "<li>", style: "font-size: 1em; line-height: 1.6;" },
    { tag: "<a>", style: "color: #5698C6; text-decoration: none;" },
    { tag: "<table>", style: "border-collapse: collapse;" },
    { tag: "<thead>", style: "font-weight: bold;" },
    { tag: "<tbody>", style: "font-weight: normal;" },
    { tag: "<tr>", style: "font-size: 1em; font-weight: normal;" },
    { tag: "<th>", style: "font-weight: bold;" },
    { tag: "<td>", style: "font-size: 1em; font-weight: normal;" },
    { tag: "<hr>", style: "border: 1px solid black;" },
    { tag: "<br>", style: "font-size: 1em; font-weight: normal;" },
  ];
  await MarkdownTagStyle.bulkCreate(styles);
}

module.exports = seedMarkdownTagStyles;
