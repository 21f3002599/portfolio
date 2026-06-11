document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileToggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        if (mobileNav.classList.contains('active')) {
            mobileToggleIcon.className = 'fa-solid fa-xmark';
        } else {
            mobileToggleIcon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileToggleIcon.className = 'fa-solid fa-bars';
        });
    });

    // 2. Project Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Animate filter change
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 200);
            });
        });
    });

    // 3. Scroll Spy Navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show sending state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Message...';
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            // Simulate API Request
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Show success status
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                
                // Reset form fields
                contactForm.reset();

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);

            }, 1500);
        });
    }
});
