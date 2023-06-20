// Purpose: login.js is used to handle the login form submission
// Initiated by: login.handlebars
const loginFormHandler = async (event) => {
  event.preventDefault()
  // avoid double click
  document.getElementById('login-button').disabled = true

  const username = document.querySelector('#username').value.trim()
  const password = document.querySelector('#password').value.trim()

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()

    if (response.ok) {
      document.location.replace('/')
    } else {
      // eslint-disable-next-line no-undef
      alertModal('Login failed', data.message)
    }
  }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler)
