// This uses dompurify to sanitize html
// https://www.npmjs.com/package/dompurify
// quoting the above link:
// DOMPurify sanitizes HTML and prevents XSS attacks. You can feed DOMPurify with string full of dirty HTML
// and it will return a string (unless configured otherwise) with clean HTML. DOMPurify will strip out
// everything that contains dangerous HTML and thereby prevent XSS attacks and other nastiness.
// it requires a DOM, so we use JSDOM to create a DOM
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const Handlebars = require("handlebars");
const path = require("path");

function sanitizeHTML(html) {
  try {
    // create a new JSDOM object
    const dom = new JSDOM("");
    // get the window object from the JSDOM object
    const window = dom.window;
    // get the document object from the window object
    const DOMPurify = createDOMPurify(window);
    // return the sanitized html
    return DOMPurify.sanitize(html);
  } catch (error) {
    console.log(error);
    return html;
  }
}

// Handlebars to format template list items
function formatTemplateListItems(templates) {
  const handlebarsTemplatePath = path.join(
    process.cwd(),
    "views",
    "partials",
    "template-listitem.handlebars"
  );
  try {
    const source = fs.readFileSync(handlebarsTemplatePath, "utf8");
    const template = Handlebars.compile(source);
    console.log(templates);
    console.log(source);
    let htmlFormat = "";
    for (let i = 0; i < templates.length; i++) {
      htmlFormat += template(templates[i]);
    }
    console.log(htmlFormat);
    return htmlFormat;
  } catch (error) {
    console.log(error);
    return "";
  }
}
module.exports = { sanitizeHTML, formatTemplateListItems };
