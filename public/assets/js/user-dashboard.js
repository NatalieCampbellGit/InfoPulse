$(document).ready(function() {
    // View button click event
    $('#view-template').click(function() {
      const selectedTemplateIndex = $('#template-list .selected').index();
      $('.factsheet').hide();
      $('.factsheet').eq(selectedTemplateIndex).show();
    });
  
    // Add Comment button click event
    $('#add-comment').click(function() {
      $('.comment-input').addClass('hidden');
      const selectedFactsheet = $('.factsheet:visible');
      const commentInput = selectedFactsheet.find('.comment-input');
      commentInput.removeClass('hidden');
      commentInput.focus();
    });
  
    // Save Comment button click event
    $('#save-comment').click(function() {
      const selectedFactsheet = $('.factsheet:visible');
      const commentInput = selectedFactsheet.find('.comment-input');
      const comment = commentInput.val();
      // Do something with the comment, such as sending it to the server
      // ...
      commentInput.val('').addClass('hidden');
    });
  });
  
  $(document).ready(function() {
    // View Templates button click event
    $('#view-templates').click(function() {
      // Implement the functionality to show the templates section
    });
  
    // Edit Profile button click event
    $('#edit-profile').click(function() {
      // Implement the functionality to edit the user profile
    });
  
    // Search button click event
    $('#search-button').click(function() {
      // Implement the functionality to perform a search based on the selected category, title, and content
    });
  
    // View button click event
    $('#view-template').click(function() {
      // Implement the functionality to view the selected template
      // You can use the selected template index to show/hide the template content
    });
  
    // New button click event
    $('#new-template').click(function() {
      // Implement the functionality to create a new template
    });
  
    // Select button click event
    $('#select-template').click(function() {
      // Implement the functionality to select a template
    });
  
    // Add Comment button click event
    $('#add-comment').click(function() {
      // Implement the functionality to show the comment input box for the currently visible factsheet
    });
  
    // Save Comment button click event
    $('#save-comment').click(function() {
      // Implement the functionality to retrieve the comment from the input box and perform any necessary actions
    });
  });
  
