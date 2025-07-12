const button = document.querySelector('.mobile-menu-button');
const mobileNav = document.querySelector('.mobile-menu');

button.addEventListener('click', () => {
  mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
});


const scrollButton = document.getElementById('scrollButton');
const footer = document.getElementById('footer');
let scrollIntervalId = null;
let isAutoScrolling = false;

function stopAutoScroll() {
    if (scrollIntervalId) {
        clearInterval(scrollIntervalId);
        scrollIntervalId = null;
        isAutoScrolling = false;
    }
}

scrollButton.addEventListener('click', () => {
    // If already auto-scrolling, do nothing
    if (isAutoScrolling) return;
    
    const footerPosition = footer.getBoundingClientRect().top + window.scrollY;
    const scrollStep = 3;
    let currentPosition = window.scrollY;
    
    isAutoScrolling = true;
    
    scrollIntervalId = setInterval(() => {
        if (currentPosition >= footerPosition || 
            currentPosition + window.innerHeight >= document.body.scrollHeight) {
            stopAutoScroll();
        } else {
            currentPosition += scrollStep;
            window.scrollBy(0, scrollStep);
        }
    }, 10);

    // Add event listeners to detect user interruption
    window.addEventListener('wheel', stopAutoScroll, { once: true });
    window.addEventListener('touchmove', stopAutoScroll, { once: true });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
            e.key === 'PageUp' || e.key === 'PageDown' || 
            e.key === 'Home' || e.key === 'End') {
            stopAutoScroll();
        }
    }, { once: true });
});

// Also stop when reaching the bottom in case the footer position calculation wasn't exact
window.addEventListener('scroll', () => {
    if (isAutoScrolling && 
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 10) {
        stopAutoScroll();
    }
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
  });


// this is the code for random abstract bubbles
const container = document.querySelector('.bubbles-container');

  function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = Math.random() * 100 + 20; // 20px to 120px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left = `${Math.random() * 100}%`;

    bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;

    container.appendChild(bubble);

    // Remove bubble after animation
    setTimeout(() => bubble.remove(), 15000);
  }

  // Create multiple bubbles at intervals
  setInterval(createBubble, 300);
