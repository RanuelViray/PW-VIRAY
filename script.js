// Initialize navigation functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.navbar-collapse');
const navItems = document.querySelectorAll('.nav-link');
const header = document.querySelector('header');
let lastScrollTop = 0;

// Toggle mobile menu with Bootstrap collapse
hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

// Reset active states and collapse menu on link click
navItems.forEach(link => {
    link.addEventListener('click', () => {
        navItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        if (window.innerWidth <= 768) {
            hamburger.click(); // Collapse navbar on mobile
        }
    });
});

// Hide navbar on scroll down, show on scroll up
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    header.classList.toggle('hidden', currentScroll > lastScrollTop && currentScroll > 0);
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


// Section observer for active nav link
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Fade-in observer for sections
const observerOptionsFadeIn = {
    root: null,
    threshold: 0.1,
};

const observerFadeIn = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptionsFadeIn);

sections.forEach(section => {
    section.classList.add('fade-in');
    observerFadeIn.observe(section);
});

// Contact form validation
const form = document.querySelector('.contact-form');
const feedback = document.querySelector('.form-feedback');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();
    if (name && email.includes('@') && subject && message) {
        feedback.style.display = 'block';
        feedback.style.color = 'var(--primary-color)';
        feedback.textContent = 'Message sent successfully!';
        form.reset();
        setTimeout(() => feedback.style.display = 'none', 3000);
    } else {
        feedback.style.display = 'block';
        feedback.style.color = '#ff4444';
        feedback.textContent = 'Please fill out all fields correctly.';
    }
});

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Display the SweetAlert success message
    Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your message has been sent successfully!',
        confirmButtonColor: '#00ff99',
    });

    // Clear the form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
});

// Neon Grid Animation for Home section
const canvas = document.getElementById('home-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.getElementById('home').offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animation variables
const gridSpacing = 70;
const glowIntensity = 0.5;
let time = 0;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = `rgba(204, 0, 255, ${glowIntensity * Math.sin(time * 0.01)})`;
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x <= canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Draw glowing nodes
    ctx.fillStyle = `rgba(0, 255, 153, ${glowIntensity * Math.cos(time * 0.01)})`;
    for (let x = 0; x <= canvas.width; x += gridSpacing) {
        for (let y = 0; y <= canvas.height; y += gridSpacing) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    time++;
    requestAnimationFrame(drawGrid);
}

// Mouse interaction for canvas
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    ctx.fillStyle = `rgba(204, 0, 255, 0.8)`;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
    ctx.fill();
});

// Start animation
drawGrid();

// Drag-and-drop functionality for skills
const skills = document.querySelectorAll('.skill');

skills.forEach(skill => {
    skill.addEventListener('dragstart', () => {
        skill.classList.add('dragging');
    });

    skill.addEventListener('dragend', () => {
        skill.classList.remove('dragging');
    });
});

// Toggle functionality for skills, education, and hobbies sections
document.getElementById("skills-btn").addEventListener("click", function () {
    showSection("skills-section", this);
});
document.getElementById("education-btn").addEventListener("click", function () {
    showSection("education-section", this);
});
document.getElementById("hobbies-btn").addEventListener("click", function () {
    showSection("hobbies-section", this);
});

function showSection(sectionId, button) {
    const sections = document.querySelectorAll(".toggle-section");
    const buttons = document.querySelectorAll(".toggle-btn");

    sections.forEach((section) => section.classList.add("hidden"));
    buttons.forEach((btn) => btn.classList.remove("active"));

    document.getElementById(sectionId).classList.remove("hidden");
    button.classList.add("active");
}

// Toggle hobby details on click
function toggleHobbyDetails(hobbyItem) {
    const details = hobbyItem.querySelector(".hobby-details");
    if (details.classList.contains("visible")) {
        details.classList.remove("visible");
    } else {
        details.classList.add("visible");
    }
}

// Typing animation functionality
const typingElement = document.getElementById("typing-animation");
const phrases = ["IT Student", "Problem Solver", "Tech Enthusiast"];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentPhrase = phrases[currentPhraseIndex];
    if (isDeleting) {
        currentCharIndex--;
    } else {
        currentCharIndex++;
    }

    typingElement.textContent = currentPhrase.slice(0, currentCharIndex);

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        // Pause before deleting
        setTimeout(() => (isDeleting = true), 1000);
    } else if (isDeleting && currentCharIndex === 0) {
        // Move to the next phrase
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 100 : 150; // Adjust typing and deleting speed
    setTimeout(typeAnimation, typingSpeed);
}

// Start the typing animation
typeAnimation();

// Modal functionality
function openModal() {
    document.getElementById("profileModal").style.display = "none";
}

function closeModal() {
    document.getElementById("profileModal").style.display = "flex";
}