const Handlebars = require("handlebars");

// register the helper function with Handlebars
function ifeq(a, b, options) {
  if (a == b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

Handlebars.registerHelper("ifeq", ifeq);
