// Get all elements that need to be interacted with
const navMenu = document.getElementById("nav-menu");
const body = document.body;
const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeBtn");
const mobileNav = document.getElementById("mobileNav");
const nav = document.querySelector("nav");
// Get all elements with the class 'alert-trigger'
const alertLinks = document.querySelectorAll(".alert-trigger"); 
const alertModal = document.getElementById("custom-alert-modal");
const alertTitle = document.getElementById("alert-title");
const alertMessage = document.getElementById("alert-message");
const alertOkBtn = document.getElementById("alert-ok-btn");

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

function triggerAlert() {
    alert("Will be uploaded soon. Thank You!")
};