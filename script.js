let currentSection = 1;
const numSections = 3;
const sectionHeight = window.innerHeight;
let isScrolling = false;
let animationFrameId = null;
let touchStartY = null;
let touchMoveThreshold = 50; // Adjust this threshold as needed

// Add event listeners for scroll and touch swipe
window.addEventListener('wheel', handleScroll);
window.addEventListener('touchstart', handleTouchStart, { passive: false });
window.addEventListener('touchmove', handleTouchMove, { passive: false });

function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (touchStartY === null) return;

    const touchEndY = event.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaY) >= touchMoveThreshold) {
        touchStartY = null;

        const scrollDirection = deltaY > 0 ? 'up' : 'down';

        if (scrollDirection === 'down' && currentSection < numSections) {
            currentSection++;
        } else if (scrollDirection === 'up' && currentSection > 1) {
            currentSection--;
        }

        scrollToSection(currentSection);

        // Prevent default touch scrolling behavior only when changing sections
        event.preventDefault();
    }
}

function handleScroll(event) {
    // Check if scrolling is already in progress
    if (isScrolling) return;

    // Determine the direction of the scroll
    const scrollDirection = event.deltaY > 0 ? 'down' : 'up';

    if (scrollDirection === 'down' && currentSection < numSections) {
        currentSection++;
    } else if (scrollDirection === 'up' && currentSection > 1) {
        currentSection--;
    }

    // Scroll to the target section using requestAnimationFrame
    scrollToSection(currentSection);
}

function scrollToSection(sectionNumber) {
    const targetSection = document.getElementById(`section${sectionNumber}`);
    const targetPosition = targetSection.offsetTop;

    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Adjust the duration as needed
    let startTime = null;

    function animateScroll(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeOutQuart(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
            animationFrameId = requestAnimationFrame(animateScroll);
        } else {
            isScrolling = false;
        }
    }

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    isScrolling = true;
    animationFrameId = requestAnimationFrame(animateScroll);
}

// Easing function for smoother scrolling
function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

const section = document.querySelectorAll('section')

window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        if (top > offset && top < offset + height) {
            sec.classList.add("start-animation")
        } else {
            sec.classList.remove("start-animation")
        }
    })
}

onload = add()

function add() {
    const section = document.getElementById("section1")
    setTimeout(function () {
        section.classList.add("start-animation")
    }, 1);
}