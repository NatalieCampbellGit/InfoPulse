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
  