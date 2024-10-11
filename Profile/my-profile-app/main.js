document.addEventListener('DOMContentLoaded', () => {
    // Refresh Page
    document.getElementById('refreshPage').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Highlight Navigation Links Based on Scroll Position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Check if the current scroll position is within the section
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active link based on the current section
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Dark Mode Toggle
    const toggleButton = document.getElementById('toggleDarkMode');
    const darkModeStylesheet = document.createElement('link');
    darkModeStylesheet.rel = 'stylesheet';
    darkModeStylesheet.href = './dark-mode.css'; // Path to your dark-mode.css

    // Check localStorage for dark mode preference on page load
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    toggleButton.addEventListener('click', () => {
        // Toggle dark mode based on current preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        document.head.appendChild(darkModeStylesheet);
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
        localStorage.setItem('darkMode', 'enabled'); // Store preference
        console.log('Dark mode enabled');
    }

    function disableDarkMode() {
        if (document.head.contains(darkModeStylesheet)) {
            document.head.removeChild(darkModeStylesheet);
        }
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
        localStorage.setItem('darkMode', 'disabled'); // Store preference
        console.log('Dark mode disabled');
    }
});
const typewriterWords = ['UI / UX Designer', 'Developer', 'Web Designer'];
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingDelay = 200; // Typing speed
let pauseDuration = 3000; // Pause after complete word

function type() {
    const typewriterElement = document.getElementById('typewriter');
    const currentWord = typewriterWords[currentWordIndex];

    if (isDeleting) {
        // Remove a character
        typewriterElement.textContent = currentWord.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false; // Switch to typing mode
            currentWordIndex = (currentWordIndex + 1) % typewriterWords.length; // Move to the next word
            setTimeout(type, pauseDuration); // Pause before typing next word
            return;
        }
    } else {
        // Add a character
        typewriterElement.textContent = currentWord.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentWord.length) {
            isDeleting = true; // Start deleting after typing complete
            setTimeout(type, pauseDuration); // Pause before starting to delete
            return;
        }
    }

    setTimeout(type, isDeleting ? 100 : typingDelay); // Adjust typing speed
}

// Start typing animation when the section comes into view
function handleScroll() {
    const section = document.getElementById('about');
    const sectionPosition = section.getBoundingClientRect().top;

    if (sectionPosition <= window.innerHeight && sectionPosition >= 0) {
        type(); // Start the typewriter effect when the section is in view
        window.removeEventListener('scroll', handleScroll); // Remove listener after starting
    }
}

// Attach scroll event
window.addEventListener('scroll', handleScroll);
