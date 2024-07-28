/*DELETE SCROLL URL HISTORY EVERYTIME AFTER RELOAD*/
document.querySelectorAll('.scroll-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Remove the hash from the URL after the scrolling
            history.pushState(null, null, ' ');
        }
    });
});

/*CHECKING FOR THE HEIGHT OF VIEWPORT TO ANIMATE*/
document.addEventListener('DOMContentLoaded', function() {
    const crewChildren = document.querySelectorAll('.crew_child');

    const handleScroll = () => {
        const windowHeight = window.innerHeight;

        crewChildren.forEach(child => {
            const rect = child.getBoundingClientRect();

            if (rect.top <= windowHeight - 50) {
                child.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check in case the elements are already in view on page load
    handleScroll();
});

/*CAST CONTAINER AS SLIDER*/
document.addEventListener('DOMContentLoaded', (event) => {
    const castContainer = document.querySelector('.cast');
    let isDown = false;
    let startX;
    let scrollLeft;

    castContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        castContainer.classList.add('active');
        startX = e.pageX - castContainer.offsetLeft;
        scrollLeft = castContainer.scrollLeft;
    });

    castContainer.addEventListener('mouseleave', () => {
        isDown = false;
        castContainer.classList.remove('active');
    });

    castContainer.addEventListener('mouseup', () => {
        isDown = false;
        castContainer.classList.remove('active');
    });

    castContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - castContainer.offsetLeft;
        const walk = (x - startX) * 3; // Scroll-fast
        castContainer.scrollLeft = scrollLeft - walk;
    });

    // For touch devices
    castContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - castContainer.offsetLeft;
        scrollLeft = castContainer.scrollLeft;
    });

    castContainer.addEventListener('touchend', () => {
        isDown = false;
    });

    castContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - castContainer.offsetLeft;
        const walk = (x - startX) * 3; // Scroll-fast
        castContainer.scrollLeft = scrollLeft - walk;
    });
});

/*ODDOMETER FOR CURRENCY ANNIMATION*/

// Helper function to format numbers as currency without decimals
function formatCurrency(value, currency) {
    return value.toLocaleString('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0 });
}

// Function to animate the number change
function animateValue(id, start, end, duration, currency) {
    const element = document.getElementById(id);
    const range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * range + start);
        element.textContent = formatCurrency(currentValue, currency);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Callback function for Intersection Observer
const grossIndia= document.getElementById("gross-india");
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateValue("budget", 0, 150000000, 2000, 'USD');
            animateValue("gross-us-canada", 0, 134806913, 2000, 'USD');
            animateValue("opening-weekend", 0, 55414050, 2000, 'USD');
            animateValue("gross-india", 0, 95805000, 3000, 'INR');
            animateValue("gross-worldwide", 0, 264770996, 3000, 'USD');
            // Unobserve after animating
            observer.unobserve(entry.target);
        }
    });
}

// Create Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1 // Trigger when at least 10% of the container is visible
});

// Start observing the container
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('stats-container');
    if (container) {
        observer.observe(container);
    }
});

