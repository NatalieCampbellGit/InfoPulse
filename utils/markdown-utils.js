// this utility file is used to convert markdown to html
// it is used in the beforeCreate and beforeUpdate hooks in models\Template.js
// it is also used in the beforeCreate and beforeUpdate hooks in models\Factsheet.js for the customMarkdown fields
// it uses the marked library to convert markdown to html, and a helper package called marked-emoji to convert emojis
// it also uses the octokit library to get the list of emojis from github
const marked = require('marked')
const markedEmoji = require('marked-emoji')
const { Octokit } = require('@octokit/rest')
// const sanitizeHtml = require('./html-utils')

// get emojis from github
async function getEmojis () {
  // use a global variable to store the emojis to avoid repeated calls to github
  // console.log(global.emojis)

  if (!global.emojis || Object.keys(global.emojis).length === 0) {
    global.emojis = {}
    try {
      const octokit = new Octokit()
      console.log('Getting emojis from github...')
      const emojiData = await octokit.rest.emojis.get()
      global.emojis = emojiData.data
    } catch (err) {
      console.error(err)
      global.emojis = {}
    }
  }
}

// convert markdown to html
async function convertMarkdownToHTML (markdown) {
  if (!markdown) return ''
  // get the list of emojis from github
  await getEmojis()
  // set the options for marked
  marked.use({
    async: false,
    pedantic: false,
    gfm: true,
    mangle: false,
    headerIds: false
  })
  // if there are emojis, add them to the options for marked
  if (emojis && emojis.length) {
    const emojiOptions = {
      emojis,
      unicode: true
    }
    marked.use(markedEmoji(emojiOptions))
  }
  // convert the markdown to html using marked
  return marked.parse(markdown)
}

module.exports = convertMarkdownToHTML

// const markdownInput = '**Hello, World! 😄**\n\n* This is a list\n* Another item in the list'
// async function test () {
//   console.log(markdownInput)
//   const html = await convertMarkdownToHTML(markdownInput)
//   console.log(html)
//   const purifiedHtml = await sanitizeHtml(html)
//   console.log(purifiedHtml)
// }

// test()