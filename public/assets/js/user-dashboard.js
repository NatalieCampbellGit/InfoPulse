function toggleFactsheet(factsheetId) {
    var factsheet = document.getElementById('factsheet-' + factsheetId);
    if (factsheet.classList.contains('hidden')) {
      factsheet.classList.remove('hidden');
    } else {
      factsheet.classList.add('hidden');
    }
  }
  
  // Add click event to factsheet titles
  var factsheetTitles = document.querySelectorAll('#view-factsheets .border-2');
  factsheetTitles.forEach(function(title) {
    title.addEventListener('click', function() {
      var factsheetId = this.getAttribute('data-factsheet-id');
      
      // Check if the second factsheet is open and close it
      var secondFactsheet = document.getElementById('factsheet-' + factsheetId === '1' ? '2' : '1');
      if (!secondFactsheet.classList.contains('hidden')) {
        secondFactsheet.classList.add('hidden');
      }
      
      toggleFactsheet(factsheetId);
    });
  });
  