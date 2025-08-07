// Navbar Loader - Centralized navbar management
class NavbarLoader {
    constructor() {
        this.navbarContainer = null;
        this.navbarHTML = null;
        this.isLoaded = false;
    }

    // Initialize navbar loading
    init() {
        this.createNavbarContainer();
        this.loadNavbar();
    }

    // Create navbar container if it doesn't exist
    createNavbarContainer() {
        // Check if navbar container already exists
        this.navbarContainer = document.querySelector('#navbar-container');
        
        if (!this.navbarContainer) {
            // Create navbar container
            this.navbarContainer = document.createElement('div');
            this.navbarContainer.id = 'navbar-container';
            
            // Insert at the beginning of body
            const body = document.body;
            const firstChild = body.firstChild;
            body.insertBefore(this.navbarContainer, firstChild);
        }
    }

    // Load navbar HTML from navbar.html
    async loadNavbar() {
        try {
            const response = await fetch('navbar.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.navbarHTML = await response.text();
            this.renderNavbar();
            this.initializeNavbarFunctionality();
            
        } catch (error) {
            console.error('Error loading navbar:', error);
            this.showFallbackNavbar();
        }
    }

    // Render navbar HTML
    renderNavbar() {
        if (this.navbarContainer && this.navbarHTML) {
            this.navbarContainer.innerHTML = this.navbarHTML;
            this.isLoaded = true;
        }
    }

    // Initialize navbar functionality
    initializeNavbarFunctionality() {
        if (!this.isLoaded) return;

        // Initialize mobile menu
        this.initializeMobileMenu();
        
        // Initialize desktop dropdowns
        this.initializeDesktopDropdowns();
        
        // Set active page
        this.setActivePage();
    }

    // Initialize mobile menu functionality
    initializeMobileMenu() {
        const menu = document.getElementById("mobileMenu");
        const openBtn = document.getElementById("openMenuBtn");
        const closeBtn = document.getElementById("closeMenuBtn");

        if (openBtn && closeBtn && menu) {
            openBtn.onclick = () => {
                menu.classList.add("open");
                document.body.style.overflow = "hidden";
            };

            closeBtn.onclick = () => {
                menu.classList.remove("open");
                this.closeAllSubmenus();
                document.body.style.overflow = "";
            };
        }

        // Escape key to close mobile menu
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && menu) {
                menu.classList.remove("open");
                this.closeAllSubmenus();
                document.body.style.overflow = "";
            }
        });
    }

    // Initialize desktop dropdown functionality
    initializeDesktopDropdowns() {
        // Bootstrap dropdown initialization
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = dropdown.closest('.dropdown');
                const menu = parent.querySelector('.dropdown-menu');
                
                if (menu) {
                    menu.classList.toggle('show');
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    }

    // Set active page in navbar
    setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Mobile submenu functions
    openSubMenu(id) {
        const submenu = document.getElementById(id);
        if (submenu) {
            submenu.classList.add("open");
        }
    }

    closeSubMenu(id) {
        const submenu = document.getElementById(id);
        if (submenu) {
            submenu.classList.remove("open");
        }
    }

    closeAllSubmenus() {
        document.querySelectorAll(".submenu-panel.open").forEach(panel => {
            panel.classList.remove("open");
        });
    }

    // Fallback navbar if loading fails
    showFallbackNavbar() {
        const fallbackHTML = `
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container">
                    <a class="navbar-brand" href="index.html">Webginet</a>
                    <div class="navbar-nav">
                        <a class="nav-link" href="index.html">Home</a>
                        <a class="nav-link" href="about.html">About</a>
                        <a class="nav-link" href="contact.html">Contact</a>
                    </div>
                </div>
            </nav>
        `;
        
        if (this.navbarContainer) {
            this.navbarContainer.innerHTML = fallbackHTML;
        }
    }
}

// Custom element for navbar
class MyNavbar extends HTMLElement {
    connectedCallback() {
        const navbarLoader = new NavbarLoader();
        navbarLoader.init();
    }
}

// Register custom element
if (!customElements.get('my-navbar')) {
    customElements.define('my-navbar', MyNavbar);
}

// Global functions for mobile menu (for backward compatibility)
window.openSubMenu = function(id) {
    const navbarLoader = window.navbarLoader;
    if (navbarLoader) {
        navbarLoader.openSubMenu(id);
    }
};

window.closeSubMenu = function(id) {
    const navbarLoader = window.navbarLoader;
    if (navbarLoader) {
        navbarLoader.closeSubMenu(id);
    }
};

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global navbar loader instance
    window.navbarLoader = new NavbarLoader();
    window.navbarLoader.init();
});

// Export for use in other scripts
window.NavbarLoader = NavbarLoader;
