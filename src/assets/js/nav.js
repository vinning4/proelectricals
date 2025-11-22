// Select DOM elements
const bodyElement = document.querySelector("body");
const navbarMenu = document.querySelector("#cs-navigation");
const hamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

// Function to toggle the aria-expanded attribute
function toggleAriaExpanded(element) {
    const isExpanded = element.getAttribute("aria-expanded");
    element.setAttribute("aria-expanded", isExpanded === "false" ? "true" : "false");
}

// Function to toggle the menu open or closed
function toggleMenu() {
    hamburgerMenu.classList.toggle("cs-active");
    navbarMenu.classList.toggle("cs-active");
    bodyElement.classList.toggle("cs-open");
    toggleAriaExpanded(hamburgerMenu);
}

// Add click event listener to the hamburger menu
hamburgerMenu.addEventListener("click", toggleMenu);

// Add click event listener to the navbar menu to handle clicks on the pseudo-element
navbarMenu.addEventListener("click", function (event) {
    if (event.target === navbarMenu && navbarMenu.classList.contains("cs-active")) {
        toggleMenu();
    }
});

// Function to handle dropdown toggle
function toggleDropdown(element) {
    element.classList.toggle("cs-active");
    const dropdownButton = element.querySelector(".cs-dropdown-button");
    if (dropdownButton) {
        toggleAriaExpanded(dropdownButton);
    }
}

// Add event listeners to each dropdown element for accessibility
const dropdownElements = document.querySelectorAll(".cs-dropdown");
dropdownElements.forEach(element => {
    let escapePressed = false;

    element.addEventListener("focusout", function (event) {
        // Skip the focusout logic if escape was pressed
        if (escapePressed) {
            escapePressed = false;
            return;
        }

        // If the focus has moved outside the dropdown, remove the active class from the dropdown 
        if (!element.contains(event.relatedTarget)) {
            element.classList.remove("cs-active");
            const dropdownButton = element.querySelector(".cs-dropdown-button");

            if (dropdownButton) {
                toggleAriaExpanded(dropdownButton);
            }
        }
    });

    element.addEventListener("keydown", function (event) {
        if (element.classList.contains("cs-active")) {
            event.stopPropagation();
        }

        // Pressing Enter or Space will toggle the dropdown and adjust the aria-expanded attribute
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleDropdown(element);
        }

        // Pressing Escape will remove the active class from the dropdown. The stopPropagation above will stop the hamburger menu from closing
        if (event.key === "Escape") {
            escapePressed = true;
            toggleDropdown(element);
        }
    });

    // Handles dropdown menus on mobile - the matching media query (max-width: 63.9375rem) is necessary so that clicking the dropdown button on desktop does not add the active class and thus interfere with the hover state
    const maxWidthMediaQuery = window.matchMedia("(max-width: 63.9375rem)");
    if (maxWidthMediaQuery.matches) {
        element.addEventListener("click", () => toggleDropdown(element));
    }
});

// Pressing Enter will redirect to the href
const dropdownLinks = document.querySelectorAll(".cs-drop-li > .cs-li-link");
dropdownLinks.forEach(link => {
    link.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            window.location.href = this.href;
        }
    });
});

// If you press Escape and the hamburger menu is open, close it
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && hamburgerMenu.classList.contains("cs-active")) {
        toggleMenu();
    }
});


// Claude addition (works well!): 

// ========================================
// SCROLL-BASED ACTIVE NAV LINK
// ========================================

// Function to update active nav link based on scroll position
function updateActiveNavOnScroll() {
    // Find all sections with IDs on the page
    const sections = document.querySelectorAll('section[id], div[id]');
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.cs-li-link');
    
    // Variable to store the ID of the current section in view
    let currentSection = '';
    
    // Loop through each section to check if it's in view
    sections.forEach(section => {
        // Get the section's position from the top of the page
        const sectionTop = section.offsetTop;
        
        // Get the section's height
        const sectionHeight = section.clientHeight;
        
        // Check if we've scrolled past this section (with 100px offset for header)
        if (window.scrollY >= (sectionTop - 150)) {
            // Save this section's ID as the current section
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update the active class on navigation links
    navLinks.forEach(link => {
        // Remove active class from all links first
        link.classList.remove('cs-active');
        
        // Get the link's href attribute (e.g., "/#services-341")
        const linkHref = link.getAttribute('href');
        
        // Build the expected href from the current section ID
        const expectedHref = `/#${currentSection}`;
        
        // If the link matches the current section, make it active
        if (linkHref === expectedHref) {
            link.classList.add('cs-active');
        }
        
        // Special case: If at the top of the page, activate the Home link
        if (window.scrollY < 100 && linkHref === '/') {
            link.classList.add('cs-active');
        }
    });
}

// Listen for scroll events and update active link
window.addEventListener('scroll', updateActiveNavOnScroll);

// Run the function once when page loads to set initial active link
updateActiveNavOnScroll();

// Claude addition end.