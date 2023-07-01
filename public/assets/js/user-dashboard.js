// user-dashboard.js

// Get all the factsheet list items
const factsheetItems = document.querySelectorAll('#view-factsheets .border-2');

// Add click event listener to each factsheet list item
factsheetItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Hide all factsheet content
    const factsheetContent = document.querySelectorAll('#view-posts .border-2');
    factsheetContent.forEach(content => {
      content.style.display = 'none';
    });

    // Show the selected factsheet content
    factsheetContent[index].style.display = 'block';
  });
});
