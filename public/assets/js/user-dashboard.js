<<<<<<< HEAD
// user-dashboard.js

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // Retrieve the necessary elements
  var factSheetSection = document.getElementById('view-fact-sheet');
  var addCommentSection = document.getElementById('add-comment');
  var commentForm = document.getElementById('comment-form');

  // Function to toggle the visibility of the fact sheet section
  function toggleFactSheetSection() {
    factSheetSection.classList.toggle('hidden');
  }

  // Function to toggle the visibility of the add comment section
  function toggleAddCommentSection() {
    addCommentSection.classList.toggle('hidden');
  }

  // Event listener for the fact sheet section button
  factSheetSection.addEventListener('click', toggleFactSheetSection);

  // Event listener for the add comment section button
  addCommentSection.addEventListener('click', toggleAddCommentSection);

  // Event listener for the comment form submission
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // Add your code here to handle the comment form submission
  });

});
=======
// Functions for the user dashboard user-dashboard.handlebars
>>>>>>> origin/main
