const factsheets = [
    {
      id: 1,
      template: {
        id: 1,
        title: "Understanding Glaucoma",
        html: ""
      }
    },
    {
      id: 2,
      template: {
        id: 2,
        title: "Understanding Myopia (Shortsightedness)",
        html: ""
      }
    },
    {
      id: 3,
      template: {
        id: 3,
        title: "Understanding Hyperopia (Longsightedness)",
        html: ""
      }
    },
    {
      id: 4,
      template: {
        id: 4,
        title: "Understanding Astigmatism",
        html: ""
      }
    },
    {
      id: 5,
      template: {
        id: 5,
        title: "Understanding Presbyopia",
        html: ""
      }
    },
    {
      id: 6,
      template: {
        id: 6,
        title: "Understanding Dry Eye",
        html: ""
      }
    },
    {
      id: 7,
      template: {
        id: 7,
        title: "Eye Injury Prevention",
        html: ""
      }
    },
    {
      id: 8,
      template: {
        id: 8,
        title: "Common Vision Problems in Children",
        html: ""
      }
    },
    {
      id: 9,
      template: {
        id: 9,
        title: "Understanding Age-Related Macular Degeneration",
        html: ""
      }
    },
    {
      id: 10,
      template: {
        id: 10,
        title: "Understanding Eye Care Practitioners",
        html: ""
      }
    },
    {
      id: 11,
      template: {
        id: 11,
        title: "Fun facts about the Eye and Vision",
        html: ""
      }
    },
    {
      id: 12,
      template: {
        id: 12,
        title: "Understanding Cataracts",
        html: ""
      }
    },
    {
      id: 13,
      template: {
        id: 13,
        title: "Diabetes and Eye Care",
        html: ""
      }
    }
  ];
  
  let currentIndex = 0;
  
  // Function to update the current factsheet
  function updateCurrentFactsheet() {
    const currentFactsheet = factsheets[currentIndex];
  }
  
  // Function to handle the Next button click event
  function handleNextButtonClick() {
    if (currentIndex < factsheets.length - 1) {
      currentIndex++;
      updateCurrentFactsheet();
    }
  }
  
  // Function to handle the Previous button click event
  function handlePreviousButtonClick() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCurrentFactsheet();
    }
  }
  
  // Add event listeners for Next and Previous buttons
  const nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", handleNextButtonClick);
  
  const previousButton = document.getElementById("previous-button");
  previousButton.addEventListener("click", handlePreviousButtonClick);
  
  updateCurrentFactsheet();
  