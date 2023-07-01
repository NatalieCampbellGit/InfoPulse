// user-dashboard.js

// Function to show the first factsheet box
function showFirstFactsheet() {
    // Hide all other factsheet boxes
    const factsheetBoxes = document.querySelectorAll('.user-factsheet');
    factsheetBoxes.forEach((box) => {
      box.style.display = 'none';
    });
  
    // Show the first factsheet box
    const firstFactsheetBox = document.querySelector('.user-factsheet[data-id="1"]');
    firstFactsheetBox.style.display = 'block';
  }
  
  // Function to show the second factsheet box
  function showSecondFactsheet() {
    // Hide all other factsheet boxes
    const factsheetBoxes = document.querySelectorAll('.user-factsheet');
    factsheetBoxes.forEach((box) => {
      box.style.display = 'none';
    });
  
    // Show the second factsheet box
    const secondFactsheetBox = document.querySelector('.user-factsheet[data-id="2"]');
    secondFactsheetBox.style.display = 'block';
  }
  
  // Attach event listeners to the title elements
  const firstTitle = document.querySelector('.text-xl.font-bold.mb-2'); // Replace with the actual selector for the first title element
  const secondTitle = document.querySelector('.text-xl.font-bold.mb-2'); // Replace with the actual selector for the second title element
  
  firstTitle.addEventListener('click', showFirstFactsheet);
  secondTitle.addEventListener('click', showSecondFactsheet);
  