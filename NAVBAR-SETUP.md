# Navbar Setup Guide

This guide explains how to use the centralized navbar system that ensures consistency across all pages.

## How It Works

The navbar system uses a centralized approach where:
1. `navbar.html` contains the complete navbar HTML (both mobile and desktop versions)
2. `js/navbar-loader.js` automatically loads the navbar into every page
3. The navbar is consistent across all pages and easy to maintain

## Files Overview

- **`navbar.html`** - Contains the complete navbar HTML structure
- **`js/navbar-loader.js`** - JavaScript that automatically loads the navbar
- **`template-with-navbar.html`** - Template showing how to structure pages with the navbar
- **`css/navbar.css`** - Navbar-specific styles

## How to Use in Any Page

### Method 1: Automatic Loading (Recommended)

Simply include the navbar loader script in your page:

```html
<!-- Add this script before closing </body> tag -->
<script src="js/navbar-loader.js"></script>
```

The navbar will be automatically loaded and inserted at the beginning of the body.

### Method 2: Using Custom Element

You can also use the custom element approach:

```html
<!-- Add this where you want the navbar to appear -->
<my-navbar></my-navbar>

<!-- Include the script -->
<script src="js/navbar-loader.js"></script>
```

## Page Structure

Here's the recommended structure for any page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your head content -->
    <link rel="stylesheet" href="css/navbar.css" />
</head>
<body>
    <!-- Spinner (optional) -->
    <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>

    <!-- Navbar will be automatically loaded here -->
    <!-- No need to add any navbar HTML - it's loaded automatically -->

    <!-- Your page content -->
    <div class="container-fluid p-0">
        <!-- Your content here -->
    </div>

    <!-- Footer -->
    <!-- Your footer content -->

    <!-- Scripts -->
    <script src="js/main.js"></script>
    <script src="js/navbar-loader.js"></script>
</body>
</html>
```

## Converting Existing Pages

To convert an existing page to use the new navbar system:

1. **Remove the hardcoded navbar HTML** from the page
2. **Add the navbar loader script** before the closing `</body>` tag:
   ```html
   <script src="js/navbar-loader.js"></script>
   ```
3. **Ensure navbar.css is included** in the head:
   ```html
   <link rel="stylesheet" href="css/navbar.css" />
   ```

## Features

### Automatic Features
- ✅ **Consistent navbar** across all pages
- ✅ **Mobile responsive** design
- ✅ **Dropdown menus** for desktop
- ✅ **Mobile slide-out menu** with submenus
- ✅ **Active page highlighting**
- ✅ **Fallback navbar** if loading fails
- ✅ **Bootstrap integration**

### Mobile Menu Features
- ✅ **Slide-out menu** from the right
- ✅ **Nested submenus** with back navigation
- ✅ **Escape key** to close menu
- ✅ **Touch-friendly** navigation
- ✅ **Smooth animations**

### Desktop Features
- ✅ **Hover dropdowns** for main menu items
- ✅ **Multi-level dropdowns** for complex navigation
- ✅ **Smooth animations** and transitions
- ✅ **Responsive design** that adapts to screen size

## Customization

### Modifying the Navbar
To modify the navbar, simply edit `navbar.html`. Changes will automatically appear on all pages.

### Styling
Navbar styles are in `css/navbar.css`. You can customize:
- Colors and gradients
- Animations and transitions
- Mobile menu behavior
- Desktop dropdown styling

### Adding New Menu Items
1. Edit `navbar.html`
2. Add your new menu item in both mobile and desktop sections
3. The changes will appear on all pages automatically

## Troubleshooting

### Navbar Not Loading
1. Check that `navbar.html` exists in the root directory
2. Ensure `js/navbar-loader.js` is included in your page
3. Check browser console for any JavaScript errors

### Mobile Menu Not Working
1. Ensure `css/navbar.css` is included
2. Check that Font Awesome is loaded for icons
3. Verify that Bootstrap is properly loaded

### Desktop Dropdowns Not Working
1. Ensure Bootstrap JavaScript is loaded
2. Check that the dropdown classes are correct
3. Verify that the navbar HTML structure is intact

## Browser Support

The navbar system supports:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- The navbar is loaded once and cached by the browser
- Minimal JavaScript overhead
- Fast loading and rendering
- Optimized for mobile performance

## Maintenance

### Updating the Navbar
1. Edit `navbar.html` with your changes
2. All pages will automatically use the updated navbar
3. No need to update individual pages

### Adding New Pages
1. Use the template structure from `template-with-navbar.html`
2. Include the navbar loader script
3. The navbar will automatically load and work

## Example Implementation

See `template-with-navbar.html` for a complete example of how to structure a page with the navbar system.

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all required files are present
3. Ensure the file paths are correct
4. Test on different browsers and devices
