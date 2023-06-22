// Event handlers

// Search for a specific template
// =======================================================================
document.getElementById('category-list').addEventListener('change', function () {
  console.log('Category changed')
})

document.getElementById('search-box').addEventListener('keyup', function () {
  console.log('Search text entered')
})

document.getElementById('search-button').addEventListener('click', async function () {
  console.log('Search button clicked')

  // get the value of the category-list select
  let categoryId
  const categoryList = document.getElementById('category-list')
  if (categoryList) {
    categoryId = categoryList.options[categoryList.selectedIndex].value
  }
  console.log(categoryId)

  // get the value of the search-box input
  const searchBox = document.getElementById('search-box')
  const searchText = searchBox.value.trim()
  let returnedData
  console.log(searchText)
  // basic validation
  if (!categoryId && !searchText) {
    alert('Please select a category or enter some search text.')
    return
  }

  // send a GET request with the form data
  try {
    const requestData = { category_id: categoryId, search_text: searchText }
    const response = await fetch('/api/templates', {
      method: 'GET',
      body: JSON.stringify(requestData),
      headers: { 'Content-Type': 'application/json' }
    })

    returnedData = await response.json()
    // check if the request was successful
    if (!response.ok) {
      // get the response body
      alert('error! ' + returnedData.message)
      return
    }
  } catch (error) {
    alert('error! ' + error.message)
    return
  }

  // load up the returned data into the template list
  const templateList = document.getElementById('template-list')
  templateList.innerHTML = ''
  returnedData.forEach(template => {
    const templateListItem = document.createElement('li')
    templateListItem.textContent = template.name
    // Store the template id in the data-id attribute
    templateListItem.dataset.id = template.id
    templateList.appendChild(templateListItem)
  })
})

// =======================================================================

document.getElementById('new').addEventListener('click', function () {
  console.log('New button clicked')
})

document.getElementById('edit').addEventListener('click', function () {
  console.log('Edit button clicked')
})

document.getElementById('delete').addEventListener('click', function () {
  console.log('Delete button clicked')
})

document.getElementById('image-select').addEventListener('change', function () {
  console.log('Image selected')
})

document.getElementById('classSelect').addEventListener('change', function () {
  console.log('Class selected')
})

document.getElementById('openModal').addEventListener('click', function () {
  console.log('Open Modal button clicked')
  document.getElementById('myModal').style.display = 'block'
})

document.getElementById('file-upload').addEventListener('change', function () {
  console.log('File selected')
})

document.getElementById('file-title').addEventListener('keyup', function () {
  console.log('Image title entered')
})

document.getElementById('file-description').addEventListener('keyup', function () {
  console.log('Image description entered')
})

document.getElementById('save').addEventListener('click', async function (event) {
  console.log('Save button clicked')

  // prevent the form from submitting normally
  event.preventDefault()

  // get the file, title, and description
  const fileInput = document.querySelector('#file-upload')
  const titleInput = document.querySelector('#file-title')
  const descriptionInput = document.querySelector('#file-description')

  const file = fileInput.files[0]
  const title = titleInput.value.trim()
  const description = descriptionInput.value.trim()

  // basic validation
  if (!file) {
    alert('Please select a file.')
    return
  }

  if (!title) {
    alert('Please enter a title.')
    return
  }

  if (!description) {
    alert('Please enter a description.')
    return
  }

  // hide the modal
  document.getElementById('myModal').style.display = 'none'
  // create a new FormData object
  const formData = new FormData()

  // append the file, title, and description to the form data
  formData.append('image', file)
  formData.append('title', title)
  formData.append('description', description)
  console.log(...formData)
  try {
    // send a POST request with the form data
    const response = await fetch('/api/images', {
      method: 'POST',
      body: formData
    })
    const returnedData = await response.json()
    // check if the request was successful
    if (!response.ok) {
      // get the response body
      alert('error! ' + returnedData.message)
      return
    }

    // do something with the response (e.g. display a success message)
    alert(returnedData.message)
    const imageId = returnedData.id
    if (!imageId) {
      alert('error! ' + returnedData.message)
      return
    }
    const image = await fetch(`/api/images/${imageId}`)
    // show the image in the browser
    const imageBlob = await image.blob()
    const imageUrl = URL.createObjectURL(imageBlob)
    const imageElement = document.createElement('img')
    imageElement.src = imageUrl
    document.body.appendChild(imageElement)
    alert('Image uploaded successfully!')
  } catch (error) {
    console.error('An error occurred while uploading the image:', error)
    alert(error.message)
  }
})

document.getElementById('cancel').addEventListener('click', function () {
  console.log('Cancel button clicked')
  document.getElementById('myModal').style.display = 'none'
})

// insert the text
document.getElementById('insert-text').addEventListener('click', function (event) {
  console.log('Insert text button clicked')
  // get the image from the select
  const imageSelect = document.getElementById('image-select')
  const imageId = imageSelect.options[imageSelect.selectedIndex].value
  const imageDescription = imageSelect.options[imageSelect.selectedIndex].dataset.description
  // get the class from the select
  const classSelect = document.getElementById('classSelect')
  const classCSSName = classSelect.options[classSelect.selectedIndex].value
  // get the default width from the select
  let defaultWidthSelect = classSelect.options[classSelect.selectedIndex].dataset.defaultWidth
  if (defaultWidthSelect === undefined) {
    defaultWidthSelect = 1200
  }
  // validate
  if (!imageId || !classCSSName) {
    alert('Please select an image and a style css class for the image.')

    return
  }
  // construct html img tag
  let imgTag = `<img src="/api/images/${imageId}" alt="${imageDescription}" class="${classCSSName}" width="${defaultWidthSelect}">`
  // add trailing and leading new lines
  imgTag = '\n\n' + imgTag + '\n\n'
  // insert the img tag at the cursor
  insertAtCursor(document.getElementById('template-text'), imgTag)
})

// =======================================================================
// add text to the text area where the cursor is
function insertAtCursor (myField, myValue) {
  if (myField.selectionStart || myField.selectionStart == '0') {
    const startPos = myField.selectionStart
    const endPos = myField.selectionEnd
    myField.value = myField.value.substring(0, startPos) +
            myValue +
            myField.value.substring(endPos, myField.value.length)
  } else {
    myField.value += myValue
  }
}

// =======================================================================
// Query the API for the list of images
// =======================================================================
async function getImages () {
  let returnedData
  // send a GET request with the form data
  try {
    // ! TODO: change the URL to the correct one
    const debugURL = 'http://localhost:3001/api/images'
    // const productionURL = '/api/images'
    const response = await fetch(debugURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    returnedData = await response.json()
    // check if the request was successful
    if (!response.ok) {
      // get the response body
      alert('error! ' + returnedData.message)
      return
    }
  } catch (error) {
    alert('error! ' + error.message)
    return
  }
  return returnedData
}

// call getImages and load them into the select
async function loadImages () {
  const images = await getImages()
  const imageSelect = document.getElementById('image-select')
  imageSelect.innerHTML = ''
  images.forEach(image => {
    const option = document.createElement('option')
    option.value = image.id
    option.dataset.description = image.description
    option.textContent = image.title
    imageSelect.appendChild(option)
  })
}

// get the preview html button and add an event listener
document.getElementById('preview-html').addEventListener('click', async function () {
  console.log('Preview HTML button clicked')
  // get the text from the text area
  const textArea = document.getElementById('template-text')
  const markdown = textArea.value.trim()
  // validate
  if (!text) {
    alert('Please enter some text.')
    return
  }
  // query the API
try{
  const response = await fetch('/api/markdown/html', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ markdown })
  })
} catch (error) {
  alert('error! ' + error.message)
  return
}
// get the response (html)
const returnedData = await response.json()
if (!response.ok) {
  alert('error! ' + returnedData.message)

  // get the response body
  // show the preview
  const preview = document.getElementById('preview')
  preview.innerHTML = markdown
  // TODO finish this code here!!!
})



// =======================================================================
// call loadImages on page load
// detect page load
window.addEventListener('load', function () {
  console.log('Page loaded')
  loadImages()
})
