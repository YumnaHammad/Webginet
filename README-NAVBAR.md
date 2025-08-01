# Navbar System Documentation

## Overview
This navbar system allows you to maintain a single navbar file (`navbar.html`) that gets loaded across all pages of the website. This ensures consistency and makes maintenance easier.

## Files Structure

### Core Files
- `navbar.html` - Contains the complete navbar HTML (both mobile and desktop versions)
- `js/navbar-loader.js` - JavaScript file that loads the navbar from the external file
- `template.html` - Template showing how to implement the navbar system

### Updated Files
- `index.html` - Updated to use the new navbar system
- `about.html` - Updated to use the new navbar system

## How to Implement on Any Page

### 1. Add the Navbar Container
Replace any existing navbar code with:
```html
<!-- Navbar Start -->
<!-- Include the navbar from external file -->
<div id="navbar-container"></div>
<!-- Navbar End -->
```

### 2. Include the Navbar Loader Script
Add this script tag before the closing ` <script>
      document.addEventListener("DOMContentLoaded", function () {
        const menu = document.getElementById("mobileMenu");
        const openBtn = document.getElementById("openMenuBtn");
        const closeBtn = document.getElementById("closeMenuBtn");
  
        console.log("openBtn:", openBtn);   // ✅ Check if found
        console.log("closeBtn:", closeBtn);
  
        if (openBtn && closeBtn && menu) {
          openBtn.onclick = () => {
            menu.classList.add("open");
            document.body.style.overflow = "hidden";
          };
  
          closeBtn.onclick = () => {
            console.log("Close button clicked"); // Debug
            menu.classList.remove("open");
            closeAllSubmenus();
            document.body.style.overflow = "";
          };
  
        } else {
          console.error("One or more menu buttons not found in DOM.");
        }
  
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") {
            menu.classList.remove("open");
            closeAllSubmenus();
            document.body.style.overflow = "";
          }
        });
      });
  
      // ✅ Make submenu functions globally accessible
      function openSubMenu(id) {
        document.getElementById(id)?.classList.add("open");
      }
  
      function closeSubMenu(id) {
        document.getElementById(id)?.classList.remove("open");
      }
  
      function closeAllSubmenus() {
        document.querySelectorAll(".submenu-panel.open").forEach(panel => {
          panel.classList.remove("open");
        });
      }
    </script>
</body>` tag:
```html
<!-- Navbar Loader -->
<script src="js/navbar-loader.js"></script>
```

### 3. Required CSS
Make sure you have the navbar CSS file included:
```html
<link rel="stylesheet" href="css/navbar.css" />
```

## Features

### Mobile Responsive
- Mobile menu with hamburger icon
- Slide-out menu with submenus
- Touch-friendly navigation

### Desktop Navigation
- Dropdown menus for "Explore & Market" and "Services"
- Multi-level dropdowns
- Hover effects and smooth transitions

### Working Links
All navigation links are properly set up to point to the correct pages:
- Home: `index.html`
- About: `about.html`
- Contact: `contact.html`
- Group: `Group.html`
- Career: `Career.html`
- And all submenu items point to their respective pages

### Active Page Detection
The navbar automatically detects the current page and highlights the active navigation item.

## Mobile Menu Functions
The following functions are available globally for mobile menu interaction:
- `openSubMenu(id)` - Opens a submenu
- `closeSubMenu(id)` - Closes a submenu
- `closeAllSubmenus()` - Closes all open submenus

## Error Handling
If the navbar file fails to load, a fallback simple navbar will be displayed with basic navigation links.

## Browser Compatibility
- Modern browsers with ES6+ support
- Fallback for older browsers
- Mobile and desktop responsive

## Maintenance
To update the navbar:
1. Edit `navbar.html` with your changes
2. All pages will automatically use the updated navbar
3. No need to update individual pages

## Example Implementation
See `template.html` for a complete example of how to implement this navbar system on a new page. 