document.addEventListener('DOMContentLoaded', function() {
  const factsheets = [
    {
      category_id: 1,
      title: "Understanding Glaucoma",
      description: "Overview of Glaucoma",
      template: {
        html: `<p># Glaucoma: The Silent Thief of Vision</p>
               <p>This is the HTML content for the Understanding Glaucoma factsheet.</p>`,
        administrator_id: 1,
      },
      comments: [
        // Comments for the Understanding Glaucoma factsheet
      ],
    },
    {
      category_id: 2,
      title: "Understanding Myopia (Shortsightedness)",
      description: "An overview of myopia (shortsightedness) and its causes, symptoms, risks, and interventions.",
      template: {
        html: "<p>This is the HTML content for the Understanding Myopia factsheet.</p>",
        administrator_id: 1,
      },
      comments: [
        // Comments for the Understanding Myopia factsheet
      ],
    },
  ];

  // Check if the "Understanding Glaucoma" factsheet exists and add a click event listener
  const understandingGlaucomaFactsheet = factsheets.find(factsheet => factsheet.title === 'Understanding Glaucoma');
  if (understandingGlaucomaFactsheet) {
    const understandingGlaucomaElement = document.getElementById(`fact-${understandingGlaucomaFactsheet.category_id}`);

    understandingGlaucomaElement.addEventListener('click', function() {
      // Uncomment the section by removing the 'hidden' class
      const viewPostsSection = document.getElementById('view-posts');
      viewPostsSection.classList.remove('hidden');
    });
  }
});
