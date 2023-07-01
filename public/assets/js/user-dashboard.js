// JavaScript
const factsheets = document.querySelectorAll('.user-factsheet');

function showFactsheet(factsheetId) {
  factsheets.forEach((factsheet) => {
    const id = factsheet.getAttribute('data-id');
    
    if (id === factsheetId) {
      factsheet.classList.remove('hidden');
    } else {
      factsheet.classList.add('hidden');
    }
  });
}

// Example usage
showFactsheet('2');
