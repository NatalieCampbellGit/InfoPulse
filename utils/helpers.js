/* eslint-disable camelcase */
const Handlebars = require("handlebars");

// register the helper function with Handlebars
function ifeq(a, b, options) {
  if (a == b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

function format_time(date) {
  return date.toLocaleTimeString();
}

function format_date(date) {
  // these routines return the user's local time, so don't have to worry about timezones
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  return `${day}/${month}/${year}`;
}

module.exports = { format_time, format_date };
Handlebars.registerHelper("ifeq", ifeq);
Handlebars.registerHelper("format_time", format_time);
Handlebars.registerHelper("format_date", format_date);
