// Get all elements that need to be interacted with
const navMenu = document.getElementById("nav-menu")
const body = document.body;
const hamburger = document.getElementById("hamburger")
const closeBtn = document.getElementById("closeBtn")
const mobileNav = document.getElementById("mobileNav")
const nav = document.querySelector("nav");

// 1. Check for saved theme in localStorage on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
   if (savedTheme === "dark") {
        body.classList.add("darkmode");
    }
}
 else {
    // Fallback to OS preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        body.classList.add("darkmode");
    }
}

// 2. Toggle button for dark/light mode
document.getElementById("theme-toggle").addEventListener("click", () => {
    body.classList.toggle("darkmode");

    // Save theme to localStorage
    if (body.classList.contains("darkmode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// ===== Hamburger icon to view nav =====
hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
});
closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// ===== Nav background on scroll =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===== Animate progress bars using Intersection Observer and requestAnimationFrame =====
document.addEventListener("DOMContentLoaded", () => {
    const progresses = document.querySelectorAll('.progress');
    const percents = document.querySelectorAll(".percent");

    const animateProgress = (timestamp, startTime, duration, target, element, percentElement) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentWidth = progress * target;
        const currentPercent = Math.floor(progress * target);

        element.style.width = currentWidth + "%";
        percentElement.textContent = currentPercent + "%";

        if (progress < 1) {
            requestAnimationFrame((nextTimestamp) => animateProgress(nextTimestamp, startTime, duration, target, element, percentElement));
        }
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillsSection = entry.target;
                const bars = skillsSection.querySelectorAll('.progress');
                const percentages = skillsSection.querySelectorAll('.percent');
                
                bars.forEach((bar, index) => {
                    const target = +bar.getAttribute("data-target");
                    const duration = 1500; // Animation duration in milliseconds
                    requestAnimationFrame((timestamp) => animateProgress(timestamp, timestamp, duration, target, bar, percentages[index]));
                });
                observer.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    // We observe the parent section to trigger the animation
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Intersection Observer for fade-in effect on other sections
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in").forEach(el => {
        sectionObserver.observe(el);
    });
});


//Toggle on and off svg for dark/lightmode 
const toggleOnSVG = 
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192S490 64 384 64L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>';

const toggleOffSVG = 
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M416 192C486.7 192 544 249.3 544 320C544 390.7 486.7 448 416 448L224 448C153.3 448 96 390.7 96 320C96 249.3 153.3 192 224 192L416 192zM608 320C608 214 522 128 416 128L224 128C118 128 32 214 32 320C32 426 118 512 224 512L416 512C522 512 608 426 608 320zM224 400C268.2 400 304 364.2 304 320C304 275.8 268.2 240 224 240C179.8 240 144 275.8 144 320C144 364.2 179.8 400 224 400z"/></svg>';