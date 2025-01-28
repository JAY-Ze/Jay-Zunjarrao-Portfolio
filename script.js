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
