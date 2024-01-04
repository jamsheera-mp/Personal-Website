// Function to validate email using a regular expression
function validateEmail(email) {
  var emailRegex =  
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email);
}

// Function to check if a string contains numbers
function containsNumbers(input) {
  return /\d/.test(input);
}

// Event listener for the DOMContentLoaded event, which triggers when the HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', function () {
  // Get references to the form and message elements
  var form = document.getElementById('submit-form');
  var msg = document.getElementById('msg');

  // Event listener for the form's submit event
  form.addEventListener('submit', function (e) {
      // Prevent the default form submission behavior
      e.preventDefault();

      // Get values from input fields
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var subject = document.getElementById('subject').value;
      var message = document.getElementById('message').value;

      // Check if email is valid using the validateEmail function
      if (!validateEmail(email)) {
          // Display an alert and an error message next to the email input field
          alert('Please enter a valid email address.');
          document.getElementById('email-error').innerText = 'Invalid email address';
          return false;
      }

      // Check if name contains numbers using the containsNumbers function
      if (containsNumbers(name)) {
          // Display an alert and an error message next to the name input field
          alert('Please enter a name without numbers.');
          document.getElementById('name-error').innerHTML = 'Name cannot contain numbers';
          return false;
      }

      // Check other required fields
      if (name.trim() === ''||subject.trim() === ''|| message.trim() === '') {
          // Display an alert and error messages next to the required fields
          alert('Please fill out all required fields.');
          document.getElementById('name-error').innerHTML = '<span style="color: red;">This field is required</span>';
          document.getElementById('subject-error').innerHTML= '<span style="color: red;">This field is required</span>';
          document.getElementById('message-error').innerHTML = '<span style="color: red;">This field is required</span>';
          return false;
      }

      // Clear any existing error messages
      document.getElementById('email-error').innerText = '';
      document.getElementById('name-error').innerText = '';
      document.getElementById('subject-error').innerText = '';
      document.getElementById('message-error').innerText = '';

      // Submit the form data to the specified scriptURL using the fetch API
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwfkqiGY33fGxVk7Spw81OV_hS1qI1EW-WLS7Gt82r5hSBZFHUgxqGB1746LP_igIhH3g/exec';
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(function (response) {
              // Check if the response is successful
              if (response.ok) {
                  // Display a success message, reset the form, and clear the message after 5 seconds
                  msg.innerHTML = '<span style="color: green;">Message sent successfully</span>';
                  setTimeout(function () {
                    msg.innerHTML = '';
                  }, 5000);
                  form.reset();
              } else {
                  // Log an error if the response is not successful
                  console.error('Error!', response.status, response.statusText);
              }
          })
          .catch(function (error) {
              // Log an error if the fetch operation fails
              console.error('Error!', error.message);
          });
  });
});



  
  
   
  