document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Typewriter effect
    const typewriterText = document.querySelector('.typewriter-text');
    const phrases = [
        'Senior Software Engineer',
        'Full-Stack Developer',
        'Cloud Architect',
        'Open Source Contributor',
        'Tech Mentor'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isEnd = true;
            setTimeout(typeWriter, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 500);
        } else {
            const typingSpeed = isDeleting ? 50 : 100;
            const speedVariation = Math.random() * 100;
            setTimeout(typeWriter, typingSpeed + speedVariation);
        }
        
        if (isEnd) {
            isDeleting = true;
            isEnd = false;
        }
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percent = bar.parentElement.previousElementSibling.querySelector('.skill-percent').textContent;
            bar.style.width = percent;
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills-progress')) {
                    animateSkillBars();
                }
                
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skills-progress, .project-card, .expertise-card, .timeline-content').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize skills radar chart
    const skillsRadar = document.getElementById('skillsRadar');
    
    if (skillsRadar) {
        const radarCtx = skillsRadar.getContext('2d');
        const radarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['TypeScript', 'React', 'Node.js', 'AWS', 'Python', 'SQL', 'Docker'],
                datasets: [{
                    label: 'Skill Level',
                    data: [95, 92, 90, 88, 85, 80, 75],
                    backgroundColor: 'rgba(67, 97, 238, 0.2)',
                    borderColor: 'rgba(67, 97, 238, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(67, 97, 238, 1)',
                    pointRadius: 4
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(222, 226, 230, 0.5)'
                        },
                        grid: {
                            color: 'rgba(222, 226, 230, 0.5)'
                        },
                        pointLabels: {
                            font: {
                                family: 'Inter'
                            },
                            color: 'var(--text)'
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true,
                            max: 100
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            formStatus.textContent = 'Message sent successfully!';
            formStatus.classList.add('success');
            formStatus.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide status after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.classList.remove('success');
            }, 5000);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thanks for subscribing to my newsletter!');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - var(--header-height),
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adjust section heights to account for navbar
    function adjustSectionHeights() {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${navbarHeight}px`);
        
        // Adjust hero section padding
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.paddingTop = `${navbarHeight}px`;
        }
    }
    
    // Run on load and resize
    window.addEventListener('load', adjustSectionHeights);
    window.addEventListener('resize', adjustSectionHeights);
});