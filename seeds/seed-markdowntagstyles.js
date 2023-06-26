const MarkdownTagStyle = require("../models/MarkdownTagStyle");

async function seedMarkdownTagStyles() {
  const styles = [
    {
      tag: "<h1>",
      style:
        "color: #31557F; margin-bottom: 5px; margin-top: 8px; font-size: 2.25em;",
    },
    {
      tag: "<h2>",
      style:
        "color: #31557F; margin-bottom: 5px; margin-top: 8px; font-size: 1.8em;",
    },
    {
      tag: "<h3>",
      style:
        "color: #5e86a6; margin-bottom: 5px; margin-top: 8px; font-size: 1.5em;",
    },
    {
      tag: "<h4>",
      style:
        "color: #5e86a6; margin-bottom: 5px; margin-top: 8px; font-size: 1.25em;",
    },
    {
      tag: "<h5>",
      style:
        "color: #9bbacc; margin-bottom: 5px; margin-top: 8px; font-weight: bold; font-size: 1.0em;",
    },
    {
      tag: "<h6>",
      style:
        "color: #9bbacc; margin-bottom: 5px; margin-top: 8px; font-size: 1em;",
    },
    { tag: "<p>", style: "color: #333333; font-size: 1em; line-height: 1.4;" },
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
    { tag: "<a>", style: "color: #4682B3; font-weight: bold;" },
    { tag: "<table>", style: "border-collapse: collapse;" },
    { tag: "<thead>", style: "font-weight: bold;" },
    { tag: "<tbody>", style: "font-weight: normal;" },
    { tag: "<tr>", style: "font-size: 1em; font-weight: normal;" },
    { tag: "<th>", style: "font-weight: bold;" },
    { tag: "<td>", style: "font-size: 1em; font-weight: normal;" },
    { tag: "<hr>", style: "border: 1px solid #4682B3;" },
    { tag: "<br>", style: "font-size: 1em; font-weight: normal;" },
    {
      tag: `class="img-full-width"`,
      style: "width: 100%; max-width: 1200px; min-width: 320px; height: auto;",
    },
    {
      tag: `class="img-full-width-centred"`,
      style:
        "width: 100%; max-width: 1200px; min-width: 320px; height: auto; display: block; margin-left: auto; margin-right: auto;",
    },
    {
      tag: `class="img-reduced-width"`,
      style:
        "width: 60%; max-width: 720px; min-width: 300px; min-width: 300px; height: auto;",
    },
    {
      tag: `class="img-reduced-width-centred"`,
      style:
        "width: 60%; max-width: 720px; min-width: 300px; height: auto; display: block; margin-left: auto; margin-right: auto;",
    },
    {
      tag: `class="img-small-width"`,
      style: "width: 35%; max-width: 420px; min-width: 200px; height: auto;",
    },
    {
      tag: `class="img-small-width-centred"`,
      style:
        "width: 35%; max-width: 420px; min-width: 200px; height: auto; display: block; margin-left: auto; margin-right: auto;",
    },
  ];
  await MarkdownTagStyle.bulkCreate(styles);
}

module.exports = seedMarkdownTagStyles;
