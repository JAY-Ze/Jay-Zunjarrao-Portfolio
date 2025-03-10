const scrollButton = document.getElementById('scrollButton');
    const footer = document.getElementById('footer');

    scrollButton.addEventListener('click', () => {
        const footerPosition = footer.getBoundingClientRect().top + window.scrollY; // Get footer's position
        const scrollInterval = 10; // Time interval in milliseconds
        const scrollStep = 1; // Pixels to scroll in each step
        let currentPosition = window.scrollY;
  
        const slowScroll = setInterval(() => {
          if (currentPosition >= footerPosition || currentPosition + window.innerHeight >= document.body.scrollHeight) {
            clearInterval(slowScroll); // Stop scrolling when footer is reached
          } else {
            currentPosition += scrollStep;
            window.scrollBy(0, scrollStep);
          }
        }, scrollInterval);
      });

const dynamicText = document.querySelector(".dynamic-text");

const words = ["An ENTC Engineer", "A Web Developer", "A Software Enthusiast","Java Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  dynamicText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => {
      isDeleting = true;
    },1000); // Wait before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100); // Adjust speed
}

document.addEventListener("DOMContentLoaded", typeEffect);


      document.addEventListener("DOMContentLoaded", function () {
        const progressBars = document.querySelectorAll(".progress");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.dataset.width;
                    bar.style.width = width;
                }
            });
        }, { threshold: 0.5 });
    
        progressBars.forEach(bar => {
            bar.dataset.width = bar.style.width;
            bar.style.width = "0";
            observer.observe(bar);
        });
    });
      
      
      

    document.addEventListener("DOMContentLoaded", function () {
      const animatedTitles = document.querySelectorAll(".section-title-animation");
  
      const observer = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                      entry.target.style.animationPlayState = "running"; // Start animation
                  } else {
                      entry.target.style.animationPlayState = "paused"; // Pause animation
                  }
              });
          },
          {
              threshold: 0.5, // Trigger when 50% of the section is visible
          }
      );
  
      animatedTitles.forEach((title) => {
          observer.observe(title); // Observe each animated title
      });
  });d