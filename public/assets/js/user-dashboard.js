document.addEventListener('DOMContentLoaded', function() {
  const factsheets = {{factsheets}}; // Assuming factsheets data is provided as an array

  // Check if the "Understanding Glaucoma" factsheet exists and add a click event listener
  const understandingGlaucomaFactsheet = factsheets.find(factsheet => factsheet.title === 'Understanding Glaucoma');
  if (understandingGlaucomaFactsheet) {
    const understandingGlaucomaElement = document.getElementById(understandingGlaucomaFactsheet.id);

    understandingGlaucomaElement.addEventListener('click', function() {
      // Uncomment the section by removing the 'hidden' class
      const viewPostsSection = document.getElementById('view-posts');
      viewPostsSection.classList.remove('hidden');
    });
  }
});
