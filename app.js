document.addEventListener('DOMContentLoaded', () => {

    // === Mobile Menu Toggle ===
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when links are clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // === Scroll Timeline & Corn Stalk Growth ===
    // Detect native CSS scroll-driven timeline support (Chrome 115+, Safari 26+, Edge 115+)
    const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()') && CSS.supports('animation-range', '0% 100%');

    if (!supportsScrollTimeline) {
        // Javascript Fallback for Firefox and older browsers
        const stalkPath = document.getElementById('stalk-path');
        const stalkWrapper = document.querySelector('.stalk-main-wrapper');

        if (stalkPath && stalkWrapper) {
            // Set initial dash offset properties
            stalkPath.style.strokeDasharray = '1';
            stalkPath.style.strokeDashoffset = '1';

            const handleStalkScroll = () => {
                const rect = stalkWrapper.getBoundingClientRect();
                const viewHeight = window.innerHeight;

                // Scroll starts drawing when the section top enters the viewport bottom (rect.top = viewHeight)
                // Scroll completes drawing when the section bottom exits the viewport top (rect.bottom = 0)
                const startPoint = rect.top - viewHeight;
                const scrollRange = rect.height + viewHeight;

                const progress = Math.max(0, Math.min(1, -startPoint / scrollRange));
                stalkPath.style.strokeDashoffset = 1 - progress;
            };

            window.addEventListener('scroll', () => {
                requestAnimationFrame(handleStalkScroll);
            });
            handleStalkScroll(); // Initial call to offset path if page starts scrolled down
        }
    }

    // === Intersection Observer for Card and Node Reveals ===
    // Trigger reveals using the intersection API for a clean layout activation
    const rowObserverOptions = {
        root: null,
        rootMargin: '-10% 0px -25% 0px', // triggers when row enters the main view area
        threshold: 0.1
    };

    const rowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, rowObserverOptions);

    document.querySelectorAll('.stalk-row').forEach(row => {
        rowObserver.observe(row);
    });

    // === Lead Intake Form Submission ===
    const leadForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('formSuccess');

    if (leadForm && formSuccess) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect lead parameters
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                state: document.getElementById('location').value,
                acres: document.getElementById('acres').value
            };

            console.log('Intake Lead Saved Successfully:', formData);

            // Display success message overlay
            formSuccess.style.display = 'flex';
            
            // clear form values
            leadForm.reset();
        });
    }
});
