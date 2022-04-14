// Grab element from the DOM
const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")

// Email Validation
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (re.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, `Email is not valid`)
  }
}
// Show input error message
function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = "form-control error"
  const small = formControl.querySelector("small")
  small.innerText = message
}
// Show succes outline
function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = "form-control success"
}
// check length of some fields
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    )
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} cannot be greater than ${max} characters`
    )
  } else {
    showSuccess(input)
  }
}

// Function to check if password matches
function checkPasswordsMatch(input1, input2){
if(input1.value !== input2.value){
showError(input2, `Passwords do not match`)
}
}

// Check required
function checkRequired(inputArr) {
  let isRequired = false
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`)
      isRequired = true
    } else {
      showSuccess(input)
    }
  })
  return isRequired
}

// Get getFieldName and make first letter uppercase
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event Listener on Form
form.addEventListener("submit", submit)
function submit(e) {
  e.preventDefault()

  if (checkRequired([username, email, password, confirmPassword])){
  checkLength(username, 3, 15)
  checkLength(password, 6, 25)
  checkEmail(email)
  checkPasswordsMatch(password, confirmPassword)
  }
}
